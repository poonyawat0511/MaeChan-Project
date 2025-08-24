package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockPoDetail struct {
	StockPoDetailID            int
	StockPoID                  *int
	ItemID                     *int
	RequestListID              *int
	LastWarehouseID            *int
	StockPoQty                 *int
	StockPoPrice               *float64
	StockPoRefPrice            *float64
	StockPoTotal               *float64
	TradeName                  *string
	Remark                     *string
	StockPoItemTypeID          *int
	StockPoItemDiscount        *float64
	StockPoItemMoneyDiscount   *float64
	StockPoItemUnit            *string
	StockPoTax                 *string
	StockPoItemUnitcost        *float64
	StockPoItemOwner           *string
	PoDetailCancel             *string
	StockPoBeforeDiscountPrice *float64
	CancelReason               *string
	StockDeliverQty            *int
	ReferenceID                *int
	StockItemUnitID            *int
	StockPackageQty            *int
	StockPoTaxCost             *float64
	HosGuid                    *string
	StockPoLastPrice           *float64
	SupplierID                 *int
	ItemDrugAccount            *string
	StockCoPoDetailID          *int
	RemainQty                  *int
	ItemBarcode                *string
	SupplierItemID             *int
	StockPkgBeforeDiscPrice    *float64
	StockPoItemMoneyDiscTot    *float64
	CheckKey                   *string
	RequestTagNo               *string
	ItemAvgCost                *float64
	StockPoItemDiscount2       *float64
	StockCostCenterID          *int
	StockIoNo                  *string
	ProjectRemark              *string
	StockAssetNo               *string
	ProjectNo                  *string
	Wbs                        *string
	ExchangeItemID             *int
	ExchangeItemUnitID         *int
	ExchangeQty                *int
	ExchangeRemainPackageQty   *int
	PoNormQty                  *int
	PoNormStockItemUnitID      *int
	SapPrNo                    *string
	StockBestowID              *int
	WhRemainQty                *int
	DepRemainQty               *int
	OtherDiscount              *float64
	StockPoPriceBeforeVat      *float64
	StockPoPcTypeID            *int
	StockVendorContractID      *int
	IsTransferUnit             *string
	BackOrderQty               *int
	StockVendorContractItemID  *int
}

var stockPoDetailSyncLock sync.Mutex
var isStockPoDetailSyncing bool

func SyncStockPoDetails() {
	stockPoDetailSyncLock.Lock()
	if isStockPoDetailSyncing {
		log.Println("[StockPoDetailSync] Skipping — already running")
		stockPoDetailSyncLock.Unlock()
		return
	}
	isStockPoDetailSyncing = true
	stockPoDetailSyncLock.Unlock()

	defer func() {
		stockPoDetailSyncLock.Lock()
		isStockPoDetailSyncing = false
		stockPoDetailSyncLock.Unlock()
		log.Println("[StockPoDetailSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT stock_po_detail_id, stock_po_id, item_id, request_list_id, last_warehouse_id, stock_po_qty,
			       stock_po_price, stock_po_ref_price, stock_po_total, trade_name, remark, stock_po_item_type_id,
			       stock_po_item_discount, stock_po_item_money_discount, stock_po_item_unit, stock_po_tax,
			       stock_po_item_unitcost, stock_po_item_owner, po_detail_cancel, stock_po_before_discount_price,
			       cancel_reason, stock_deliver_qty, reference_id, stock_item_unit_id, stock_package_qty,
			       stock_po_tax_cost, hos_guid, stock_po_last_price, supplier_id, item_drug_account,
			       stock_co_po_detail_id, remain_qty, item_barcode, supplier_item_id, stock_pkg_before_disc_price,
			       stock_po_item_money_disc_tot, check_key, request_tag_no, item_avg_cost, stock_po_item_discount2,
			       stock_cost_center_id, stock_io_no, project_remark, stock_asset_no, project_no, wbs,
			       exchange_item_id, exchange_item_unit_id, exchange_qty, exchange_remain_package_qty,
			       po_norm_qty, po_norm_stock_item_unit_id, sap_pr_no, stock_bestow_id, wh_remain_qty,
			       dep_remain_qty, other_discount, stock_po_price_before_vat, stock_po_pc_type_id,
			       stock_vendor_contract_id, is_transfer_unit, back_order_qty, stock_vendor_contract_item_id
			FROM stock_po_detail
			WHERE stock_po_detail_id > $1
			ORDER BY stock_po_detail_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockPoDetailSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var spd StockPoDetail
			if err := rows.Scan(&spd.StockPoDetailID, &spd.StockPoID, &spd.ItemID, &spd.RequestListID, &spd.LastWarehouseID,
				&spd.StockPoQty, &spd.StockPoPrice, &spd.StockPoRefPrice, &spd.StockPoTotal, &spd.TradeName, &spd.Remark,
				&spd.StockPoItemTypeID, &spd.StockPoItemDiscount, &spd.StockPoItemMoneyDiscount, &spd.StockPoItemUnit,
				&spd.StockPoTax, &spd.StockPoItemUnitcost, &spd.StockPoItemOwner, &spd.PoDetailCancel,
				&spd.StockPoBeforeDiscountPrice, &spd.CancelReason, &spd.StockDeliverQty, &spd.ReferenceID,
				&spd.StockItemUnitID, &spd.StockPackageQty, &spd.StockPoTaxCost, &spd.HosGuid, &spd.StockPoLastPrice,
				&spd.SupplierID, &spd.ItemDrugAccount, &spd.StockCoPoDetailID, &spd.RemainQty, &spd.ItemBarcode,
				&spd.SupplierItemID, &spd.StockPkgBeforeDiscPrice, &spd.StockPoItemMoneyDiscTot, &spd.CheckKey,
				&spd.RequestTagNo, &spd.ItemAvgCost, &spd.StockPoItemDiscount2, &spd.StockCostCenterID, &spd.StockIoNo,
				&spd.ProjectRemark, &spd.StockAssetNo, &spd.ProjectNo, &spd.Wbs, &spd.ExchangeItemID,
				&spd.ExchangeItemUnitID, &spd.ExchangeQty, &spd.ExchangeRemainPackageQty, &spd.PoNormQty,
				&spd.PoNormStockItemUnitID, &spd.SapPrNo, &spd.StockBestowID, &spd.WhRemainQty, &spd.DepRemainQty,
				&spd.OtherDiscount, &spd.StockPoPriceBeforeVat, &spd.StockPoPcTypeID, &spd.StockVendorContractID,
				&spd.IsTransferUnit, &spd.BackOrderQty, &spd.StockVendorContractItemID); err != nil {
				log.Println("[StockPoDetailSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_po_detail (stock_po_detail_id, stock_po_id, item_id, request_list_id, last_warehouse_id,
				                            stock_po_qty, stock_po_price, stock_po_ref_price, stock_po_total, trade_name,
				                            remark, stock_po_item_type_id, stock_po_item_discount, stock_po_item_money_discount,
				                            stock_po_item_unit, stock_po_tax, stock_po_item_unitcost, stock_po_item_owner,
				                            po_detail_cancel, stock_po_before_discount_price, cancel_reason, stock_deliver_qty,
				                            reference_id, stock_item_unit_id, stock_package_qty, stock_po_tax_cost, hos_guid,
				                            stock_po_last_price, supplier_id, item_drug_account, stock_co_po_detail_id,
				                            remain_qty, item_barcode, supplier_item_id, stock_pkg_before_disc_price,
				                            stock_po_item_money_disc_tot, check_key, request_tag_no, item_avg_cost,
				                            stock_po_item_discount2, stock_cost_center_id, stock_io_no, project_remark,
				                            stock_asset_no, project_no, wbs, exchange_item_id, exchange_item_unit_id,
				                            exchange_qty, exchange_remain_package_qty, po_norm_qty, po_norm_stock_item_unit_id,
				                            sap_pr_no, stock_bestow_id, wh_remain_qty, dep_remain_qty, other_discount,
				                            stock_po_price_before_vat, stock_po_pc_type_id, stock_vendor_contract_id,
				                            is_transfer_unit, back_order_qty, stock_vendor_contract_item_id)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
				        $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60,
				        $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80)
				ON CONFLICT (stock_po_detail_id) DO UPDATE SET
					stock_po_id = EXCLUDED.stock_po_id,
					item_id = EXCLUDED.item_id,
					request_list_id = EXCLUDED.request_list_id,
					last_warehouse_id = EXCLUDED.last_warehouse_id,
					stock_po_qty = EXCLUDED.stock_po_qty,
					stock_po_price = EXCLUDED.stock_po_price,
					stock_po_ref_price = EXCLUDED.stock_po_ref_price,
					stock_po_total = EXCLUDED.stock_po_total,
					trade_name = EXCLUDED.trade_name,
					remark = EXCLUDED.remark,
					stock_po_item_type_id = EXCLUDED.stock_po_item_type_id,
					stock_po_item_discount = EXCLUDED.stock_po_item_discount,
					stock_po_item_money_discount = EXCLUDED.stock_po_item_money_discount,
					stock_po_item_unit = EXCLUDED.stock_po_item_unit,
					stock_po_tax = EXCLUDED.stock_po_tax,
					stock_po_item_unitcost = EXCLUDED.stock_po_item_unitcost,
					stock_po_item_owner = EXCLUDED.stock_po_item_owner,
					po_detail_cancel = EXCLUDED.po_detail_cancel,
					stock_po_before_discount_price = EXCLUDED.stock_po_before_discount_price,
					cancel_reason = EXCLUDED.cancel_reason,
					stock_deliver_qty = EXCLUDED.stock_deliver_qty,
					reference_id = EXCLUDED.reference_id,
					stock_item_unit_id = EXCLUDED.stock_item_unit_id,
					stock_package_qty = EXCLUDED.stock_package_qty,
					stock_po_tax_cost = EXCLUDED.stock_po_tax_cost,
					hos_guid = EXCLUDED.hos_guid,
					stock_po_last_price = EXCLUDED.stock_po_last_price,
					supplier_id = EXCLUDED.supplier_id,
					item_drug_account = EXCLUDED.item_drug_account,
					stock_co_po_detail_id = EXCLUDED.stock_co_po_detail_id,
					remain_qty = EXCLUDED.remain_qty,
					item_barcode = EXCLUDED.item_barcode,
					supplier_item_id = EXCLUDED.supplier_item_id,
					stock_pkg_before_disc_price = EXCLUDED.stock_pkg_before_disc_price,
					stock_po_item_money_disc_tot = EXCLUDED.stock_po_item_money_disc_tot,
					check_key = EXCLUDED.check_key,
					request_tag_no = EXCLUDED.request_tag_no,
					item_avg_cost = EXCLUDED.item_avg_cost,
					stock_po_item_discount2 = EXCLUDED.stock_po_item_discount2,
					stock_cost_center_id = EXCLUDED.stock_cost_center_id,
					stock_io_no = EXCLUDED.stock_io_no,
					project_remark = EXCLUDED.project_remark,
					stock_asset_no = EXCLUDED.stock_asset_no,
					project_no = EXCLUDED.project_no,
					wbs = EXCLUDED.wbs,
					exchange_item_id = EXCLUDED.exchange_item_id,
					exchange_item_unit_id = EXCLUDED.exchange_item_unit_id,
					exchange_qty = EXCLUDED.exchange_qty,
					exchange_remain_package_qty = EXCLUDED.exchange_remain_package_qty,
					po_norm_qty = EXCLUDED.po_norm_qty,
					po_norm_stock_item_unit_id = EXCLUDED.po_norm_stock_item_unit_id,
					sap_pr_no = EXCLUDED.sap_pr_no,
					stock_bestow_id = EXCLUDED.stock_bestow_id,
					wh_remain_qty = EXCLUDED.wh_remain_qty,
					dep_remain_qty = EXCLUDED.dep_remain_qty,
					other_discount = EXCLUDED.other_discount,
					stock_po_price_before_vat = EXCLUDED.stock_po_price_before_vat,
					stock_po_pc_type_id = EXCLUDED.stock_po_pc_type_id,
					stock_vendor_contract_id = EXCLUDED.stock_vendor_contract_id,
					is_transfer_unit = EXCLUDED.is_transfer_unit,
					back_order_qty = EXCLUDED.back_order_qty,
					stock_vendor_contract_item_id = EXCLUDED.stock_vendor_contract_item_id
			`, spd.StockPoDetailID, spd.StockPoID, spd.ItemID, spd.RequestListID, spd.LastWarehouseID, spd.StockPoQty,
				spd.StockPoPrice, spd.StockPoRefPrice, spd.StockPoTotal, spd.TradeName, spd.Remark, spd.StockPoItemTypeID,
				spd.StockPoItemDiscount, spd.StockPoItemMoneyDiscount, spd.StockPoItemUnit, spd.StockPoTax,
				spd.StockPoItemUnitcost, spd.StockPoItemOwner, spd.PoDetailCancel, spd.StockPoBeforeDiscountPrice,
				spd.CancelReason, spd.StockDeliverQty, spd.ReferenceID, spd.StockItemUnitID, spd.StockPackageQty,
				spd.StockPoTaxCost, spd.HosGuid, spd.StockPoLastPrice, spd.SupplierID, spd.ItemDrugAccount,
				spd.StockCoPoDetailID, spd.RemainQty, spd.ItemBarcode, spd.SupplierItemID, spd.StockPkgBeforeDiscPrice,
				spd.StockPoItemMoneyDiscTot, spd.CheckKey, spd.RequestTagNo, spd.ItemAvgCost, spd.StockPoItemDiscount2,
				spd.StockCostCenterID, spd.StockIoNo, spd.ProjectRemark, spd.StockAssetNo, spd.ProjectNo, spd.Wbs,
				spd.ExchangeItemID, spd.ExchangeItemUnitID, spd.ExchangeQty, spd.ExchangeRemainPackageQty, spd.PoNormQty,
				spd.PoNormStockItemUnitID, spd.SapPrNo, spd.StockBestowID, spd.WhRemainQty, spd.DepRemainQty,
				spd.OtherDiscount, spd.StockPoPriceBeforeVat, spd.StockPoPcTypeID, spd.StockVendorContractID,
				spd.IsTransferUnit, spd.BackOrderQty, spd.StockVendorContractItemID)

			if err != nil {
				log.Printf("[StockPoDetailSync] Insert/Update into new DB failed for ID %d: %v\n", spd.StockPoDetailID, err)
			} else {
				rowCount++
				lastID = spd.StockPoDetailID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockPoDetailSync] Stock PO details sync (legacy -> new) completed.")
}
