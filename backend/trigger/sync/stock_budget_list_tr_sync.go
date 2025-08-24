package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockBudgetListTr struct {
	StockBudgetListTrID int
	StockBudgetListID   *int
	BudgetPrice         *float64
	BudgetDate          *time.Time
	BudgetNote          *string
	UpdateDatetime      *time.Time
}

var stockBudgetListTrSyncLock sync.Mutex
var isStockBudgetListTrSyncing bool

func SyncStockBudgetListTrs() {
	stockBudgetListTrSyncLock.Lock()
	if isStockBudgetListTrSyncing {
		log.Println("[StockBudgetListTrSync] Skipping — already running")
		stockBudgetListTrSyncLock.Unlock()
		return
	}
	isStockBudgetListTrSyncing = true
	stockBudgetListTrSyncLock.Unlock()

	defer func() {
		stockBudgetListTrSyncLock.Lock()
		isStockBudgetListTrSyncing = false
		stockBudgetListTrSyncLock.Unlock()
		log.Println("[StockBudgetListTrSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT stock_budget_list_tr_id, stock_budget_list_id, budget_price, budget_date, 
			       budget_note, update_datetime
			FROM stock_budget_list_tr
			WHERE stock_budget_list_tr_id > $1
			ORDER BY stock_budget_list_tr_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockBudgetListTrSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sblt StockBudgetListTr
			if err := rows.Scan(&sblt.StockBudgetListTrID, &sblt.StockBudgetListID, &sblt.BudgetPrice,
				&sblt.BudgetDate, &sblt.BudgetNote, &sblt.UpdateDatetime); err != nil {
				log.Println("[StockBudgetListTrSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_budget_list_tr (stock_budget_list_tr_id, stock_budget_list_id, budget_price, 
				                                 budget_date, budget_note, update_datetime)
				VALUES ($1, $2, $3, $4, $5, $6)
				ON CONFLICT (stock_budget_list_tr_id) DO UPDATE SET
					stock_budget_list_id = EXCLUDED.stock_budget_list_id,
					budget_price = EXCLUDED.budget_price,
					budget_date = EXCLUDED.budget_date,
					budget_note = EXCLUDED.budget_note,
					update_datetime = EXCLUDED.update_datetime
			`, sblt.StockBudgetListTrID, sblt.StockBudgetListID, sblt.BudgetPrice,
				sblt.BudgetDate, sblt.BudgetNote, sblt.UpdateDatetime)

			if err != nil {
				log.Printf("[StockBudgetListTrSync] Insert/Update into new DB failed for ID %d: %v\n", sblt.StockBudgetListTrID, err)
			} else {
				rowCount++
				lastID = sblt.StockBudgetListTrID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockBudgetListTrSync] Stock budget list transactions sync (legacy -> new) completed.")
}
