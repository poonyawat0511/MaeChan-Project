package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockBudgetType struct {
	StockBudgetTypeID   int
	StockBudgetTypeName *string
	AccPoBudgetTypeID   *int
}

var stockBudgetTypeSyncLock sync.Mutex
var isStockBudgetTypeSyncing bool

func SyncStockBudgetTypes() {
	stockBudgetTypeSyncLock.Lock()
	if isStockBudgetTypeSyncing {
		log.Println("[StockBudgetTypeSync] Skipping — already running")
		stockBudgetTypeSyncLock.Unlock()
		return
	}
	isStockBudgetTypeSyncing = true
	stockBudgetTypeSyncLock.Unlock()

	defer func() {
		stockBudgetTypeSyncLock.Lock()
		isStockBudgetTypeSyncing = false
		stockBudgetTypeSyncLock.Unlock()
		log.Println("[StockBudgetTypeSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT stock_budget_type_id, stock_budget_type_name, acc_po_budget_type_id
			FROM stock_budget_type
			WHERE stock_budget_type_id > $1
			ORDER BY stock_budget_type_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockBudgetTypeSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sbt StockBudgetType
			if err := rows.Scan(&sbt.StockBudgetTypeID, &sbt.StockBudgetTypeName, &sbt.AccPoBudgetTypeID); err != nil {
				log.Println("[StockBudgetTypeSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_budget_type (stock_budget_type_id, stock_budget_type_name, acc_po_budget_type_id)
				VALUES ($1, $2, $3)
				ON CONFLICT (stock_budget_type_id) DO UPDATE SET
					stock_budget_type_name = EXCLUDED.stock_budget_type_name,
					acc_po_budget_type_id = EXCLUDED.acc_po_budget_type_id
			`, sbt.StockBudgetTypeID, sbt.StockBudgetTypeName, sbt.AccPoBudgetTypeID)

			if err != nil {
				log.Printf("[StockBudgetTypeSync] Insert/Update into new DB failed for ID %d: %v\n", sbt.StockBudgetTypeID, err)
			} else {
				rowCount++
				lastID = sbt.StockBudgetTypeID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockBudgetTypeSync] Stock budget types sync (legacy -> new) completed.")
}
