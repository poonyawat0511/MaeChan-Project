package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockRequestList struct {
	RequestListID                int
	RequestID                    *int
	ItemID                       *int
	RequestQty                   *int
	RequestLeftQty               *int
	RequestUnit                  *string
	RequestListUnitPrice         *float64
	RequestListTotalPrice        *float64
	RequestComplete              *string
	DepartmentID                 *int
	RequestDate                  *time.Time
	SupplierID                   *int
	Remark                       *string
	StockItemUnitID              *int
	StockPackageQty              *int
	HosGuid                      *string
	IncomingBalanceQty           *int
	Rate1Month                   *int
	StockItemUnitStandardPrice   *float64
	PackagePrice                 *float64
	LastPrice                    *float64
	Approve                      *string
	UseStockPlanBdg              *string
	StockPlanTotalAmount         *float64
	StockPlanRemainAmount        *float64
	StockPlanOutgoingAmount      *float64
	TotalPrice                   *float64
	ItemBarcode                  *string
	UnitQty                      *int
	StockPoItemTypeID            *int
	StockRequestItemDiscount     *float64
	StockRequestItemMoneyDiscount *float64
	Rate3Month                   *int
	TradeName                    *string
	TotalPlanQty                 *int
	TotalPoQty                   *int
	PlanRemainQty                *int
	ForcastMonth                 *float64
	StockVendorID                *int
	SupplierItemID               *int
	StockDepRequestListID        *int
	StockPoPcTypeID              *int
	Trimester                    *int
	TrimesterPlanQty             *int
	TrimesterPlanAmount          *float64
	TrimesterPlanUseQty          *int
	TrimesterPlanUseAmount       *float64
	TrimesterPlanRemainQty       *int
	TrimesterPlanRemainAmount    *float64
	VatPrice                     *float64
	TotalPriceBeforeVat          *float64
	LastWarehouseID              *int
	TotalPlanAmount              *float64
	ItemFlag                     *string
	StockVendorContractID        *int
	ContractRemainPackageQty     *int
}

var stockRequestListSyncLock sync.Mutex
var isStockRequestListSyncing bool

func SyncStockRequestLists() {
	stockRequestListSyncLock.Lock()
	if isStockRequestListSyncing {
		log.Println("[StockRequestListSync] Skipping — already running")
		stockRequestListSyncLock.Unlock()
		return
	}
	isStockRequestListSyncing = true
	stockRequestListSyncLock.Unlock()

	defer func() {
		stockRequestListSyncLock.Lock()
		isStockRequestListSyncing = false
		stockRequestListSyncLock.Unlock()
		log.Println("[StockRequestListSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT request_list_id, request_id, item_id, request_qty, request_left_qty, request_unit,
			       request_list_unit_price, request_list_total_price, request_complete, department_id,
			       request_date, supplier_id, remark, stock_item_unit_id, stock_package_qty, hos_guid,
			       incoming_balance_qty, rate_1_month, stock_item_unit_standard_price, package_price,
			       last_price, approve, use_stock_plan_bdg, stock_plan_total_amount, stock_plan_remain_amount,
			       stock_plan_outgoing_amount, total_price, item_barcode, unit_qty, stock_po_item_type_id,
			       stock_request_item_discount, stock_request_item_money_discount, rate_3_month, trade_name,
			       total_plan_qty, total_po_qty, plan_remain_qty, forcast_month, stock_vendor_id,
			       supplier_item_id, stock_dep_request_list_id, stock_po_pc_type_id, trimester,
			       trimester_plan_qty, trimester_plan_amount, trimester_plan_use_qty, trimester_plan_use_amount,
			       trimester_plan_remain_qty, trimester_plan_remain_amount, vat_price, total_price_before_vat,
			       last_warehouse_id, total_plan_amount, item_flag, stock_vendor_contract_id, contract_remain_package_qty
			FROM stock_request_list
			WHERE request_list_id > $1
			ORDER BY request_list_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockRequestListSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var srl StockRequestList
			if err := rows.Scan(&srl.RequestListID, &srl.RequestID, &srl.ItemID, &srl.RequestQty, &srl.RequestLeftQty,
				&srl.RequestUnit, &srl.RequestListUnitPrice, &srl.RequestListTotalPrice, &srl.RequestComplete,
				&srl.DepartmentID, &srl.RequestDate, &srl.SupplierID, &srl.Remark, &srl.StockItemUnitID,
				&srl.StockPackageQty, &srl.HosGuid, &srl.IncomingBalanceQty, &srl.Rate1Month,
				&srl.StockItemUnitStandardPrice, &srl.PackagePrice, &srl.LastPrice, &srl.Approve,
				&srl.UseStockPlanBdg, &srl.StockPlanTotalAmount, &srl.StockPlanRemainAmount, &srl.StockPlanOutgoingAmount,
				&srl.TotalPrice, &srl.ItemBarcode, &srl.UnitQty, &srl.StockPoItemTypeID, &srl.StockRequestItemDiscount,
				&srl.StockRequestItemMoneyDiscount, &srl.Rate3Month, &srl.TradeName, &srl.TotalPlanQty, &srl.TotalPoQty,
				&srl.PlanRemainQty, &srl.ForcastMonth, &srl.StockVendorID, &srl.SupplierItemID, &srl.StockDepRequestListID,
				&srl.StockPoPcTypeID, &srl.Trimester, &srl.TrimesterPlanQty, &srl.TrimesterPlanAmount,
				&srl.TrimesterPlanUseQty, &srl.TrimesterPlanUseAmount, &srl.TrimesterPlanRemainQty,
				&srl.TrimesterPlanRemainAmount, &srl.VatPrice, &srl.TotalPriceBeforeVat, &srl.LastWarehouseID,
				&srl.TotalPlanAmount, &srl.ItemFlag, &srl.StockVendorContractID, &srl.ContractRemainPackageQty); err != nil {
				log.Println("[StockRequestListSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_request_list (request_list_id, request_id, item_id, request_qty, request_left_qty,
				                              request_unit, request_list_unit_price, request_list_total_price,
				                              request_complete, department_id, request_date, supplier_id, remark,
				                              stock_item_unit_id, stock_package_qty, hos_guid, incoming_balance_qty,
				                              rate_1_month, stock_item_unit_standard_price, package_price, last_price,
				                              approve, use_stock_plan_bdg, stock_plan_total_amount, stock_plan_remain_amount,
				                              stock_plan_outgoing_amount, total_price, item_barcode, unit_qty,
				                              stock_po_item_type_id, stock_request_item_discount, stock_request_item_money_discount,
				                              rate_3_month, trade_name, total_plan_qty, total_po_qty, plan_remain_qty,
				                              forcast_month, stock_vendor_id, supplier_item_id, stock_dep_request_list_id,
				                              stock_po_pc_type_id, trimester, trimester_plan_qty, trimester_plan_amount,
				                              trimester_plan_use_qty, trimester_plan_use_amount, trimester_plan_remain_qty,
				                              trimester_plan_remain_amount, vat_price, total_price_before_vat, last_warehouse_id,
				                              total_plan_amount, item_flag, stock_vendor_contract_id, contract_remain_package_qty)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
				        $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60,
				        $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80)
				ON CONFLICT (request_list_id) DO UPDATE SET
					request_id = EXCLUDED.request_id,
					item_id = EXCLUDED.item_id,
					request_qty = EXCLUDED.request_qty,
					request_left_qty = EXCLUDED.request_left_qty,
					request_unit = EXCLUDED.request_unit,
					request_list_unit_price = EXCLUDED.request_list_unit_price,
					request_list_total_price = EXCLUDED.request_list_total_price,
					request_complete = EXCLUDED.request_complete,
					department_id = EXCLUDED.department_id,
					request_date = EXCLUDED.request_date,
					supplier_id = EXCLUDED.supplier_id,
					remark = EXCLUDED.remark,
					stock_item_unit_id = EXCLUDED.stock_item_unit_id,
					stock_package_qty = EXCLUDED.stock_package_qty,
					hos_guid = EXCLUDED.hos_guid,
					incoming_balance_qty = EXCLUDED.incoming_balance_qty,
					rate_1_month = EXCLUDED.rate_1_month,
					stock_item_unit_standard_price = EXCLUDED.stock_item_unit_standard_price,
					package_price = EXCLUDED.package_price,
					last_price = EXCLUDED.last_price,
					approve = EXCLUDED.approve,
					use_stock_plan_bdg = EXCLUDED.use_stock_plan_bdg,
					stock_plan_total_amount = EXCLUDED.stock_plan_total_amount,
					stock_plan_remain_amount = EXCLUDED.stock_plan_remain_amount,
					stock_plan_outgoing_amount = EXCLUDED.stock_plan_outgoing_amount,
					total_price = EXCLUDED.total_price,
					item_barcode = EXCLUDED.item_barcode,
					unit_qty = EXCLUDED.unit_qty,
					stock_po_item_type_id = EXCLUDED.stock_po_item_type_id,
					stock_request_item_discount = EXCLUDED.stock_request_item_discount,
					stock_request_item_money_discount = EXCLUDED.stock_request_item_money_discount,
					rate_3_month = EXCLUDED.rate_3_month,
					trade_name = EXCLUDED.trade_name,
					total_plan_qty = EXCLUDED.total_plan_qty,
					total_po_qty = EXCLUDED.total_po_qty,
					plan_remain_qty = EXCLUDED.plan_remain_qty,
					forcast_month = EXCLUDED.forcast_month,
					stock_vendor_id = EXCLUDED.stock_vendor_id,
					supplier_item_id = EXCLUDED.supplier_item_id,
					stock_dep_request_list_id = EXCLUDED.stock_dep_request_list_id,
					stock_po_pc_type_id = EXCLUDED.stock_po_pc_type_id,
					trimester = EXCLUDED.trimester,
					trimester_plan_qty = EXCLUDED.trimester_plan_qty,
					trimester_plan_amount = EXCLUDED.trimester_plan_amount,
					trimester_plan_use_qty = EXCLUDED.trimester_plan_use_qty,
					trimester_plan_use_amount = EXCLUDED.trimester_plan_use_amount,
					trimester_plan_remain_qty = EXCLUDED.trimester_plan_remain_qty,
					trimester_plan_remain_amount = EXCLUDED.trimester_plan_remain_amount,
					vat_price = EXCLUDED.vat_price,
					total_price_before_vat = EXCLUDED.total_price_before_vat,
					last_warehouse_id = EXCLUDED.last_warehouse_id,
					total_plan_amount = EXCLUDED.total_plan_amount,
					item_flag = EXCLUDED.item_flag,
					stock_vendor_contract_id = EXCLUDED.stock_vendor_contract_id,
					contract_remain_package_qty = EXCLUDED.contract_remain_package_qty
			`, srl.RequestListID, srl.RequestID, srl.ItemID, srl.RequestQty, srl.RequestLeftQty, srl.RequestUnit,
				srl.RequestListUnitPrice, srl.RequestListTotalPrice, srl.RequestComplete, srl.DepartmentID,
				srl.RequestDate, srl.SupplierID, srl.Remark, srl.StockItemUnitID, srl.StockPackageQty, srl.HosGuid,
				srl.IncomingBalanceQty, srl.Rate1Month, srl.StockItemUnitStandardPrice, srl.PackagePrice, srl.LastPrice,
				srl.Approve, srl.UseStockPlanBdg, srl.StockPlanTotalAmount, srl.StockPlanRemainAmount,
				srl.StockPlanOutgoingAmount, srl.TotalPrice, srl.ItemBarcode, srl.UnitQty, srl.StockPoItemTypeID,
				srl.StockRequestItemDiscount, srl.StockRequestItemMoneyDiscount, srl.Rate3Month, srl.TradeName,
				srl.TotalPlanQty, srl.TotalPoQty, srl.PlanRemainQty, srl.ForcastMonth, srl.StockVendorID,
				srl.SupplierItemID, srl.StockDepRequestListID, srl.StockPoPcTypeID, srl.Trimester, srl.TrimesterPlanQty,
				srl.TrimesterPlanAmount, srl.TrimesterPlanUseQty, srl.TrimesterPlanUseAmount, srl.TrimesterPlanRemainQty,
				srl.TrimesterPlanRemainAmount, srl.VatPrice, srl.TotalPriceBeforeVat, srl.LastWarehouseID,
				srl.TotalPlanAmount, srl.ItemFlag, srl.StockVendorContractID, srl.ContractRemainPackageQty)

			if err != nil {
				log.Printf("[StockRequestListSync] Insert/Update into new DB failed for ID %d: %v\n", srl.RequestListID, err)
			} else {
				rowCount++
				lastID = srl.RequestListID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockRequestListSync] Stock request lists sync (legacy -> new) completed.")
}
