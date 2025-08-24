package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockPurchaseType struct {
	PurchaseType     int
	PurchaseTypeName *string
	HosGuid          *string
	CheckMaxTotal    *string
	MaxTotal         *float64
}

var stockPurchaseTypeSyncLock sync.Mutex
var isStockPurchaseTypeSyncing bool

func SyncStockPurchaseTypes() {
	stockPurchaseTypeSyncLock.Lock()
	if isStockPurchaseTypeSyncing {
		log.Println("[StockPurchaseTypeSync] Skipping — already running")
		stockPurchaseTypeSyncLock.Unlock()
		return
	}
	isStockPurchaseTypeSyncing = true
	stockPurchaseTypeSyncLock.Unlock()

	defer func() {
		stockPurchaseTypeSyncLock.Lock()
		isStockPurchaseTypeSyncing = false
		stockPurchaseTypeSyncLock.Unlock()
		log.Println("[StockPurchaseTypeSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT purchase_type, purchase_type_name, hos_guid, check_max_total, max_total
			FROM stock_purchase_type
			WHERE purchase_type > $1
			ORDER BY purchase_type ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockPurchaseTypeSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var spt StockPurchaseType
			if err := rows.Scan(&spt.PurchaseType, &spt.PurchaseTypeName, &spt.HosGuid, &spt.CheckMaxTotal, &spt.MaxTotal); err != nil {
				log.Println("[StockPurchaseTypeSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_purchase_type (purchase_type, purchase_type_name, hos_guid, check_max_total, max_total)
				VALUES ($1, $2, $3, $4, $5)
				ON CONFLICT (purchase_type) DO UPDATE SET
					purchase_type_name = EXCLUDED.purchase_type_name,
					hos_guid = EXCLUDED.hos_guid,
					check_max_total = EXCLUDED.check_max_total,
					max_total = EXCLUDED.max_total
			`, spt.PurchaseType, spt.PurchaseTypeName, spt.HosGuid, spt.CheckMaxTotal, spt.MaxTotal)

			if err != nil {
				log.Printf("[StockPurchaseTypeSync] Insert/Update into new DB failed for ID %d: %v\n", spt.PurchaseType, err)
			} else {
				rowCount++
				lastID = spt.PurchaseType
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockPurchaseTypeSync] Stock purchase types sync (legacy -> new) completed.")
}
