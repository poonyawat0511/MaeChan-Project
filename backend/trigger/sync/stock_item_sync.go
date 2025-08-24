package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockItem struct {
	ItemID                    int
	ItemName                  *string
	ItemUnit                  *string
	ItemType                  *int
	ItemUseStatus             *string
	ReorderLevel              *int
	ReorderQty                *int
	UnitCost                  *float64
	Oldcode                   *string
	FixDepartment             *string
	StockItemCostTypeID       *int
	StockClassID              *int
	UnitPrice                 *float64
	ItemCode                  *string
	StockItemRegdate          *time.Time
	SafetyStock               *int
	OnhandQty                 *int
	LastActiveDate            *time.Time
	LastPoDate                *time.Time
	ItemCommonName            *string
	StockItemMtrID            *int
	StockItemAcctID           *int
	StockSubClassID           *int
	ItemTradeName             *string
	StockItemNote             *string
	LastPoPrice               *float64
	StockItemStdPrice         *float64
	StockItemRefPrice         *float64
	ExpireQty                 *int
	SupplierListText          *string
	VendorListText            *string
	PoWaitQty                 *int
	LastDeliverDate           *time.Time
	ItemMinQty                *int
	ItemMaxQty                *int
	LastPoPrice1              *float64
	LastStockVendorID         *int
	StockItemEdTypeID         *int
	LastCalcSiMap             *time.Time
	UpdateDatetime            *time.Time
	DrugitemsNoSubstock       *string
	ItemStandardPrice         *float64
	ItemUnitQty               *int
	ItemPackageName           *string
	Icode                     *string
	StandardCode              *string
	DummyLeftQty              *int
	DummyLeftPrice            *float64
	ItemSubUnitQty            *int
	OldUnitCost               *float64
	Newcode                   *string
	DefaultDepartmentID       *int
	BarcodeNumber             *string
	HosGuid                   *string
	GpoCode                   *string
	DidstdCode                *string
	AvgMonthUseQty            *int
	ItemRegno                 *string
	BdgNextyearPercent        *float64
	ItemNote                  *string
	AvgLeadDay                *float64
	GpoVmi                    *string
	BalanceQty                *float64
	ItemEng                   *string
	ItemTrand                 *string
	ItemTypeGroup             *string
	ItemStatusControl         *string
	ItemVanType               *string
	SearchKeyword             *string
	Abc                       *string
	VedCode                   *string
	PharmacologyGroup1        *int
	PharmacologyGroup2        *int
	PharmacologyGroup3        *int
	VatPercent                *float64
	SapUnitName               *string
	SapItemName               *string
	SapUnitCost               *float64
	SapActive                 *string
	ManufacturerListText      *string
	UseFixedAvgCost           *string
	FixedAvgCost              *float64
	StockMrpOrderTypeID       *int
	StockMrpLotSize           *int
	ApplyVat                  *string
	GpscCode                  *string
}

var stockItemSyncLock sync.Mutex
var isStockItemSyncing bool

func SyncStockItems() {
	stockItemSyncLock.Lock()
	if isStockItemSyncing {
		log.Println("[StockItemSync] Skipping — already running")
		stockItemSyncLock.Unlock()
		return
	}
	isStockItemSyncing = true
	stockItemSyncLock.Unlock()

	defer func() {
		stockItemSyncLock.Lock()
		isStockItemSyncing = false
		stockItemSyncLock.Unlock()
		log.Println("[StockItemSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT item_id, item_name, item_unit, item_type, item_use_status, reorder_level, reorder_qty,
			       unit_cost, oldcode, fix_department, stock_item_cost_type_id, stock_class_id, unit_price,
			       item_code, stock_item_regdate, safety_stock, onhand_qty, last_active_date, last_po_date,
			       item_common_name, stock_item_mtr_id, stock_item_acct_id, stock_sub_class_id, item_trade_name,
			       stock_item_note, last_po_price, stock_item_std_price, stock_item_ref_price, expire_qty,
			       supplier_list_text, vendor_list_text, po_wait_qty, last_deliver_date, item_min_qty, item_max_qty,
			       last_po_price_1, last_stock_vendor_id, stock_item_ed_type_id, last_calc_si_map, update_datetime,
			       drugitems_no_substock, item_standard_price, item_unit_qty, item_package_name, icode, standard_code,
			       dummy_left_qty, dummy_left_price, item_sub_unit_qty, old_unit_cost, newcode, default_department_id,
			       barcode_number, hos_guid, gpo_code, didstd_code, avg_month_use_qty, item_regno, bdg_nextyear_percent,
			       item_note, avg_lead_day, gpo_vmi, balance_qty, item_eng, item_trand, item_type_group, item_status_control,
			       item_van_type, search_keyword, abc, ved_code, pharmacology_group1, pharmacology_group2, pharmacology_group3,
			       vat_percent, sap_unit_name, sap_item_name, sap_unit_cost, sap_active, manufacturer_list_text,
			       use_fixed_avg_cost, fixed_avg_cost, stock_mrp_order_type_id, stock_mrp_lot_size, apply_vat, gpsc_code
			FROM stock_item
			WHERE item_id > $1
			ORDER BY item_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockItemSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var si StockItem
			if err := rows.Scan(&si.ItemID, &si.ItemName, &si.ItemUnit, &si.ItemType, &si.ItemUseStatus,
				&si.ReorderLevel, &si.ReorderQty, &si.UnitCost, &si.Oldcode, &si.FixDepartment,
				&si.StockItemCostTypeID, &si.StockClassID, &si.UnitPrice, &si.ItemCode, &si.StockItemRegdate,
				&si.SafetyStock, &si.OnhandQty, &si.LastActiveDate, &si.LastPoDate, &si.ItemCommonName,
				&si.StockItemMtrID, &si.StockItemAcctID, &si.StockSubClassID, &si.ItemTradeName, &si.StockItemNote,
				&si.LastPoPrice, &si.StockItemStdPrice, &si.StockItemRefPrice, &si.ExpireQty, &si.SupplierListText,
				&si.VendorListText, &si.PoWaitQty, &si.LastDeliverDate, &si.ItemMinQty, &si.ItemMaxQty,
				&si.LastPoPrice1, &si.LastStockVendorID, &si.StockItemEdTypeID, &si.LastCalcSiMap, &si.UpdateDatetime,
				&si.DrugitemsNoSubstock, &si.ItemStandardPrice, &si.ItemUnitQty, &si.ItemPackageName, &si.Icode,
				&si.StandardCode, &si.DummyLeftQty, &si.DummyLeftPrice, &si.ItemSubUnitQty, &si.OldUnitCost,
				&si.Newcode, &si.DefaultDepartmentID, &si.BarcodeNumber, &si.HosGuid, &si.GpoCode, &si.DidstdCode,
				&si.AvgMonthUseQty, &si.ItemRegno, &si.BdgNextyearPercent, &si.ItemNote, &si.AvgLeadDay,
				&si.GpoVmi, &si.BalanceQty, &si.ItemEng, &si.ItemTrand, &si.ItemTypeGroup, &si.ItemStatusControl,
				&si.ItemVanType, &si.SearchKeyword, &si.Abc, &si.VedCode, &si.PharmacologyGroup1, &si.PharmacologyGroup2,
				&si.PharmacologyGroup3, &si.VatPercent, &si.SapUnitName, &si.SapItemName, &si.SapUnitCost, &si.SapActive,
				&si.ManufacturerListText, &si.UseFixedAvgCost, &si.FixedAvgCost, &si.StockMrpOrderTypeID,
				&si.StockMrpLotSize, &si.ApplyVat, &si.GpscCode); err != nil {
				log.Println("[StockItemSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_item (item_id, item_name, item_unit, item_type, item_use_status, reorder_level, reorder_qty,
				                       unit_cost, oldcode, fix_department, stock_item_cost_type_id, stock_class_id, unit_price,
				                       item_code, stock_item_regdate, safety_stock, onhand_qty, last_active_date, last_po_date,
				                       item_common_name, stock_item_mtr_id, stock_item_acct_id, stock_sub_class_id, item_trade_name,
				                       stock_item_note, last_po_price, stock_item_std_price, stock_item_ref_price, expire_qty,
				                       supplier_list_text, vendor_list_text, po_wait_qty, last_deliver_date, item_min_qty, item_max_qty,
				                       last_po_price_1, last_stock_vendor_id, stock_item_ed_type_id, last_calc_si_map, update_datetime,
				                       drugitems_no_substock, item_standard_price, item_unit_qty, item_package_name, icode, standard_code,
				                       dummy_left_qty, dummy_left_price, item_sub_unit_qty, old_unit_cost, newcode, default_department_id,
				                       barcode_number, hos_guid, gpo_code, didstd_code, avg_month_use_qty, item_regno, bdg_nextyear_percent,
				                       item_note, avg_lead_day, gpo_vmi, balance_qty, item_eng, item_trand, item_type_group, item_status_control,
				                       item_van_type, search_keyword, abc, ved_code, pharmacology_group1, pharmacology_group2, pharmacology_group3,
				                       vat_percent, sap_unit_name, sap_item_name, sap_unit_cost, sap_active, manufacturer_list_text,
				                       use_fixed_avg_cost, fixed_avg_cost, stock_mrp_order_type_id, stock_mrp_lot_size, apply_vat, gpsc_code)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
				        $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60,
				        $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80)
				ON CONFLICT (item_id) DO UPDATE SET
					item_name = EXCLUDED.item_name,
					item_unit = EXCLUDED.item_unit,
					item_type = EXCLUDED.item_type,
					item_use_status = EXCLUDED.item_use_status,
					reorder_level = EXCLUDED.reorder_level,
					reorder_qty = EXCLUDED.reorder_qty,
					unit_cost = EXCLUDED.unit_cost,
					oldcode = EXCLUDED.oldcode,
					fix_department = EXCLUDED.fix_department,
					stock_item_cost_type_id = EXCLUDED.stock_item_cost_type_id,
					stock_class_id = EXCLUDED.stock_class_id,
					unit_price = EXCLUDED.unit_price,
					item_code = EXCLUDED.item_code,
					stock_item_regdate = EXCLUDED.stock_item_regdate,
					safety_stock = EXCLUDED.safety_stock,
					onhand_qty = EXCLUDED.onhand_qty,
					last_active_date = EXCLUDED.last_active_date,
					last_po_date = EXCLUDED.last_po_date,
					item_common_name = EXCLUDED.item_common_name,
					stock_item_mtr_id = EXCLUDED.stock_item_mtr_id,
					stock_item_acct_id = EXCLUDED.stock_item_acct_id,
					stock_sub_class_id = EXCLUDED.stock_sub_class_id,
					item_trade_name = EXCLUDED.item_trade_name,
					stock_item_note = EXCLUDED.stock_item_note,
					last_po_price = EXCLUDED.last_po_price,
					stock_item_std_price = EXCLUDED.stock_item_std_price,
					stock_item_ref_price = EXCLUDED.stock_item_ref_price,
					expire_qty = EXCLUDED.expire_qty,
					supplier_list_text = EXCLUDED.supplier_list_text,
					vendor_list_text = EXCLUDED.vendor_list_text,
					po_wait_qty = EXCLUDED.po_wait_qty,
					last_deliver_date = EXCLUDED.last_deliver_date,
					item_min_qty = EXCLUDED.item_min_qty,
					item_max_qty = EXCLUDED.item_max_qty,
					last_po_price_1 = EXCLUDED.last_po_price_1,
					last_stock_vendor_id = EXCLUDED.last_stock_vendor_id,
					stock_item_ed_type_id = EXCLUDED.stock_item_ed_type_id,
					last_calc_si_map = EXCLUDED.last_calc_si_map,
					update_datetime = EXCLUDED.update_datetime,
					drugitems_no_substock = EXCLUDED.drugitems_no_substock,
					item_standard_price = EXCLUDED.item_standard_price,
					item_unit_qty = EXCLUDED.item_unit_qty,
					item_package_name = EXCLUDED.item_package_name,
					icode = EXCLUDED.icode,
					standard_code = EXCLUDED.standard_code,
					dummy_left_qty = EXCLUDED.dummy_left_qty,
					dummy_left_price = EXCLUDED.dummy_left_price,
					item_sub_unit_qty = EXCLUDED.item_sub_unit_qty,
					old_unit_cost = EXCLUDED.old_unit_cost,
					newcode = EXCLUDED.newcode,
					default_department_id = EXCLUDED.default_department_id,
					barcode_number = EXCLUDED.barcode_number,
					hos_guid = EXCLUDED.hos_guid,
					gpo_code = EXCLUDED.gpo_code,
					didstd_code = EXCLUDED.didstd_code,
					avg_month_use_qty = EXCLUDED.avg_month_use_qty,
					item_regno = EXCLUDED.item_regno,
					bdg_nextyear_percent = EXCLUDED.bdg_nextyear_percent,
					item_note = EXCLUDED.item_note,
					avg_lead_day = EXCLUDED.avg_lead_day,
					gpo_vmi = EXCLUDED.gpo_vmi,
					balance_qty = EXCLUDED.balance_qty,
					item_eng = EXCLUDED.item_eng,
					item_trand = EXCLUDED.item_trand,
					item_type_group = EXCLUDED.item_type_group,
					item_status_control = EXCLUDED.item_status_control,
					item_van_type = EXCLUDED.item_van_type,
					search_keyword = EXCLUDED.search_keyword,
					abc = EXCLUDED.abc,
					ved_code = EXCLUDED.ved_code,
					pharmacology_group1 = EXCLUDED.pharmacology_group1,
					pharmacology_group2 = EXCLUDED.pharmacology_group2,
					pharmacology_group3 = EXCLUDED.pharmacology_group3,
					vat_percent = EXCLUDED.vat_percent,
					sap_unit_name = EXCLUDED.sap_unit_name,
					sap_item_name = EXCLUDED.sap_item_name,
					sap_unit_cost = EXCLUDED.sap_unit_cost,
					sap_active = EXCLUDED.sap_active,
					manufacturer_list_text = EXCLUDED.manufacturer_list_text,
					use_fixed_avg_cost = EXCLUDED.use_fixed_avg_cost,
					fixed_avg_cost = EXCLUDED.fixed_avg_cost,
					stock_mrp_order_type_id = EXCLUDED.stock_mrp_order_type_id,
					stock_mrp_lot_size = EXCLUDED.stock_mrp_lot_size,
					apply_vat = EXCLUDED.apply_vat,
					gpsc_code = EXCLUDED.gpsc_code
			`, si.ItemID, si.ItemName, si.ItemUnit, si.ItemType, si.ItemUseStatus, si.ReorderLevel, si.ReorderQty,
				si.UnitCost, si.Oldcode, si.FixDepartment, si.StockItemCostTypeID, si.StockClassID, si.UnitPrice,
				si.ItemCode, si.StockItemRegdate, si.SafetyStock, si.OnhandQty, si.LastActiveDate, si.LastPoDate,
				si.ItemCommonName, si.StockItemMtrID, si.StockItemAcctID, si.StockSubClassID, si.ItemTradeName,
				si.StockItemNote, si.LastPoPrice, si.StockItemStdPrice, si.StockItemRefPrice, si.ExpireQty,
				si.SupplierListText, si.VendorListText, si.PoWaitQty, si.LastDeliverDate, si.ItemMinQty, si.ItemMaxQty,
				si.LastPoPrice1, si.LastStockVendorID, si.StockItemEdTypeID, si.LastCalcSiMap, si.UpdateDatetime,
				si.DrugitemsNoSubstock, si.ItemStandardPrice, si.ItemUnitQty, si.ItemPackageName, si.Icode,
				si.StandardCode, si.DummyLeftQty, si.DummyLeftPrice, si.ItemSubUnitQty, si.OldUnitCost, si.Newcode,
				si.DefaultDepartmentID, si.BarcodeNumber, si.HosGuid, si.GpoCode, si.DidstdCode, si.AvgMonthUseQty,
				si.ItemRegno, si.BdgNextyearPercent, si.ItemNote, si.AvgLeadDay, si.GpoVmi, si.BalanceQty, si.ItemEng,
				si.ItemTrand, si.ItemTypeGroup, si.ItemStatusControl, si.ItemVanType, si.SearchKeyword, si.Abc,
				si.VedCode, si.PharmacologyGroup1, si.PharmacologyGroup2, si.PharmacologyGroup3, si.VatPercent,
				si.SapUnitName, si.SapItemName, si.SapUnitCost, si.SapActive, si.ManufacturerListText, si.UseFixedAvgCost,
				si.FixedAvgCost, si.StockMrpOrderTypeID, si.StockMrpLotSize, si.ApplyVat, si.GpscCode)

			if err != nil {
				log.Printf("[StockItemSync] Insert/Update into new DB failed for ID %d: %v\n", si.ItemID, err)
			} else {
				rowCount++
				lastID = si.ItemID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockItemSync] Stock items sync (legacy -> new) completed.")
}
