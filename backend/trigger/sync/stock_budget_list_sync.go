package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockBudgetList struct {
	StockBudgetListID   int
	BudgetID            *int
	StockBudgetYear     *string
	StockBudgetPrice    *float64
	StockBudgetRemain   *float64
	StockBudgetUse      *float64
	StockBudgetRcvPrice *float64
}

var stockBudgetListSyncLock sync.Mutex
var isStockBudgetListSyncing bool

func SyncStockBudgetLists() {
	stockBudgetListSyncLock.Lock()
	if isStockBudgetListSyncing {
		log.Println("[StockBudgetListSync] Skipping — already running")
		stockBudgetListSyncLock.Unlock()
		return
	}
	isStockBudgetListSyncing = true
	stockBudgetListSyncLock.Unlock()

	defer func() {
		stockBudgetListSyncLock.Lock()
		isStockBudgetListSyncing = false
		stockBudgetListSyncLock.Unlock()
		log.Println("[StockBudgetListSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT stock_budget_list_id, budget_id, stock_budget_year, stock_budget_price, 
			       stock_budget_remain, stock_budget_use, stock_budget_rcv_price
			FROM stock_budget_list
			WHERE stock_budget_list_id > $1
			ORDER BY stock_budget_list_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockBudgetListSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sbl StockBudgetList
			if err := rows.Scan(&sbl.StockBudgetListID, &sbl.BudgetID, &sbl.StockBudgetYear, &sbl.StockBudgetPrice,
				&sbl.StockBudgetRemain, &sbl.StockBudgetUse, &sbl.StockBudgetRcvPrice); err != nil {
				log.Println("[StockBudgetListSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_budget_list (stock_budget_list_id, budget_id, stock_budget_year, stock_budget_price, 
				                              stock_budget_remain, stock_budget_use, stock_budget_rcv_price)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT (stock_budget_list_id) DO UPDATE SET
					budget_id = EXCLUDED.budget_id,
					stock_budget_year = EXCLUDED.stock_budget_year,
					stock_budget_price = EXCLUDED.stock_budget_price,
					stock_budget_remain = EXCLUDED.stock_budget_remain,
					stock_budget_use = EXCLUDED.stock_budget_use,
					stock_budget_rcv_price = EXCLUDED.stock_budget_rcv_price
			`, sbl.StockBudgetListID, sbl.BudgetID, sbl.StockBudgetYear, sbl.StockBudgetPrice,
				sbl.StockBudgetRemain, sbl.StockBudgetUse, sbl.StockBudgetRcvPrice)

			if err != nil {
				log.Printf("[StockBudgetListSync] Insert/Update into new DB failed for ID %d: %v\n", sbl.StockBudgetListID, err)
			} else {
				rowCount++
				lastID = sbl.StockBudgetListID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockBudgetListSync] Stock budget lists sync (legacy -> new) completed.")
}
