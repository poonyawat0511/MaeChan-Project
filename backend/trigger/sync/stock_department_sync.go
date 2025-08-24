package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockDepartment struct {
	DepartmentID              int
	DepartmentName            *string
	OldCode                   *string
	StatusActive              *string
	HosGuid                   *string
	StockDepartmentTypeID     *int
	DepartmentBoardName1      *string
	DepartmentBoardName2      *string
	DepartmentBoardPosition1  *string
	DepartmentBoardPosition2  *string
	DepartmentType            *int
	DepartmentCode            *string
	StoreExpiredItem          *string
	StockAuthorizeTypeID      *int
	StockCostCenterID         *int
	NoConfirmPay              *string
	ExclusiveOrder            *string
	SapID                     *int
	AllowAdjust               *string
	AllowSapMig               *string
	AllowDonation             *string
	AllowManualDraw           *string
	AllowDepTransfer          *string
	AllowWhTransfer           *string
	AllowDepRtl               *string
	AllowDepPos               *string
	AllowManualRcv            *string
	OweStock                  *string
	AccDepartmentID           *int
	AutoDailyCalcMrp          *string
	LastDailyCalcMrp          *time.Time
}

var stockDepartmentSyncLock sync.Mutex
var isStockDepartmentSyncing bool

func SyncStockDepartments() {
	stockDepartmentSyncLock.Lock()
	if isStockDepartmentSyncing {
		log.Println("[StockDepartmentSync] Skipping — already running")
		stockDepartmentSyncLock.Unlock()
		return
	}
	isStockDepartmentSyncing = true
	stockDepartmentSyncLock.Unlock()

	defer func() {
		stockDepartmentSyncLock.Lock()
		isStockDepartmentSyncing = false
		stockDepartmentSyncLock.Unlock()
		log.Println("[StockDepartmentSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT department_id, department_name, oldcode, status_active, hos_guid, stock_department_type_id,
			       department_board_name1, department_board_name2, department_board_position1, department_board_position2,
			       department_type, department_code, store_expired_item, stock_authorize_type_id, stock_cost_center_id,
			       no_confirm_pay, exclusive_order, sap_id, allow_adjust, allow_sap_mig, allow_donation, allow_manual_draw,
			       allow_dep_transfer, allow_wh_transfer, allow_dep_rtl, allow_dep_pos, allow_manual_rcv, owe_stock,
			       acc_department_id, auto_daily_calc_mrp, last_daily_calc_mrp
			FROM stock_department
			WHERE department_id > $1
			ORDER BY department_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockDepartmentSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sd StockDepartment
			if err := rows.Scan(&sd.DepartmentID, &sd.DepartmentName, &sd.OldCode, &sd.StatusActive, &sd.HosGuid,
				&sd.StockDepartmentTypeID, &sd.DepartmentBoardName1, &sd.DepartmentBoardName2, &sd.DepartmentBoardPosition1,
				&sd.DepartmentBoardPosition2, &sd.DepartmentType, &sd.DepartmentCode, &sd.StoreExpiredItem,
				&sd.StockAuthorizeTypeID, &sd.StockCostCenterID, &sd.NoConfirmPay, &sd.ExclusiveOrder, &sd.SapID,
				&sd.AllowAdjust, &sd.AllowSapMig, &sd.AllowDonation, &sd.AllowManualDraw, &sd.AllowDepTransfer,
				&sd.AllowWhTransfer, &sd.AllowDepRtl, &sd.AllowDepPos, &sd.AllowManualRcv, &sd.OweStock,
				&sd.AccDepartmentID, &sd.AutoDailyCalcMrp, &sd.LastDailyCalcMrp); err != nil {
				log.Println("[StockDepartmentSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_department (department_id, department_name, oldcode, status_active, hos_guid, 
				                            stock_department_type_id, department_board_name1, department_board_name2,
				                            department_board_position1, department_board_position2, department_type,
				                            department_code, store_expired_item, stock_authorize_type_id, stock_cost_center_id,
				                            no_confirm_pay, exclusive_order, sap_id, allow_adjust, allow_sap_mig, allow_donation,
				                            allow_manual_draw, allow_dep_transfer, allow_wh_transfer, allow_dep_rtl, allow_dep_pos,
				                            allow_manual_rcv, owe_stock, acc_department_id, auto_daily_calc_mrp, last_daily_calc_mrp)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)
				ON CONFLICT (department_id) DO UPDATE SET
					department_name = EXCLUDED.department_name,
					oldcode = EXCLUDED.oldcode,
					status_active = EXCLUDED.status_active,
					hos_guid = EXCLUDED.hos_guid,
					stock_department_type_id = EXCLUDED.stock_department_type_id,
					department_board_name1 = EXCLUDED.department_board_name1,
					department_board_name2 = EXCLUDED.department_board_name2,
					department_board_position1 = EXCLUDED.department_board_position1,
					department_board_position2 = EXCLUDED.department_board_position2,
					department_type = EXCLUDED.department_type,
					department_code = EXCLUDED.department_code,
					store_expired_item = EXCLUDED.store_expired_item,
					stock_authorize_type_id = EXCLUDED.stock_authorize_type_id,
					stock_cost_center_id = EXCLUDED.stock_cost_center_id,
					no_confirm_pay = EXCLUDED.no_confirm_pay,
					exclusive_order = EXCLUDED.exclusive_order,
					sap_id = EXCLUDED.sap_id,
					allow_adjust = EXCLUDED.allow_adjust,
					allow_sap_mig = EXCLUDED.allow_sap_mig,
					allow_donation = EXCLUDED.allow_donation,
					allow_manual_draw = EXCLUDED.allow_manual_draw,
					allow_dep_transfer = EXCLUDED.allow_dep_transfer,
					allow_wh_transfer = EXCLUDED.allow_wh_transfer,
					allow_dep_rtl = EXCLUDED.allow_dep_rtl,
					allow_dep_pos = EXCLUDED.allow_dep_pos,
					allow_manual_rcv = EXCLUDED.allow_manual_rcv,
					owe_stock = EXCLUDED.owe_stock,
					acc_department_id = EXCLUDED.acc_department_id,
					auto_daily_calc_mrp = EXCLUDED.auto_daily_calc_mrp,
					last_daily_calc_mrp = EXCLUDED.last_daily_calc_mrp
			`, sd.DepartmentID, sd.DepartmentName, sd.OldCode, sd.StatusActive, sd.HosGuid, sd.StockDepartmentTypeID,
				sd.DepartmentBoardName1, sd.DepartmentBoardName2, sd.DepartmentBoardPosition1, sd.DepartmentBoardPosition2,
				sd.DepartmentType, sd.DepartmentCode, sd.StoreExpiredItem, sd.StockAuthorizeTypeID, sd.StockCostCenterID,
				sd.NoConfirmPay, sd.ExclusiveOrder, sd.SapID, sd.AllowAdjust, sd.AllowSapMig, sd.AllowDonation,
				sd.AllowManualDraw, sd.AllowDepTransfer, sd.AllowWhTransfer, sd.AllowDepRtl, sd.AllowDepPos,
				sd.AllowManualRcv, sd.OweStock, sd.AccDepartmentID, sd.AutoDailyCalcMrp, sd.LastDailyCalcMrp)

			if err != nil {
				log.Printf("[StockDepartmentSync] Insert/Update into new DB failed for ID %d: %v\n", sd.DepartmentID, err)
			} else {
				rowCount++
				lastID = sd.DepartmentID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockDepartmentSync] Stock departments sync (legacy -> new) completed.")
}
