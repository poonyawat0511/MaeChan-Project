package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockBudget struct {
	BudgetID             int
	BudgetName           *string
	BudgetStatus         *string
	StockBudgetTypeID    *int
	AccPoBudgetSubTypeID *int
}

var stockBudgetSyncLock sync.Mutex
var isStockBudgetSyncing bool

func SyncStockBudgets() {
	stockBudgetSyncLock.Lock()
	if isStockBudgetSyncing {
		log.Println("[StockBudgetSync] Skipping — already running")
		stockBudgetSyncLock.Unlock()
		return
	}
	isStockBudgetSyncing = true
	stockBudgetSyncLock.Unlock()

	defer func() {
		stockBudgetSyncLock.Lock()
		isStockBudgetSyncing = false
		stockBudgetSyncLock.Unlock()
		log.Println("[StockBudgetSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT budget_id, budget_name, budget_status, stock_budget_type_id, acc_po_budget_sub_type_id
			FROM stock_budget
			WHERE budget_id > $1
			ORDER BY budget_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockBudgetSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sb StockBudget
			if err := rows.Scan(&sb.BudgetID, &sb.BudgetName, &sb.BudgetStatus, &sb.StockBudgetTypeID, &sb.AccPoBudgetSubTypeID); err != nil {
				log.Println("[StockBudgetSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_budget (budget_id, budget_name, budget_status, stock_budget_type_id, acc_po_budget_sub_type_id)
				VALUES ($1, $2, $3, $4, $5)
				ON CONFLICT (budget_id) DO UPDATE SET
					budget_name = EXCLUDED.budget_name,
					budget_status = EXCLUDED.budget_status,
					stock_budget_type_id = EXCLUDED.stock_budget_type_id,
					acc_po_budget_sub_type_id = EXCLUDED.acc_po_budget_sub_type_id
			`, sb.BudgetID, sb.BudgetName, sb.BudgetStatus, sb.StockBudgetTypeID, sb.AccPoBudgetSubTypeID)

			if err != nil {
				log.Printf("[StockBudgetSync] Insert/Update into new DB failed for ID %d: %v\n", sb.BudgetID, err)
			} else {
				rowCount++
				lastID = sb.BudgetID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockBudgetSync] Stock budgets sync (legacy -> new) completed.")
}
