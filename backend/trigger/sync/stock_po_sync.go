package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockPo struct {
	StockPoID                    int
	WarehouseID                  *int
	RefRequestID                 *int
	BudgetID                     *int
	StockPoNo                    *string
	StockPoDate                  *time.Time
	SupplierID                   *int
	ItemType                     *int
	PurchaseType                 *int
	PaidStatusID                 *int
	StockPoConfirm               *string
	PoAmount                     *float64
	PoItemAmount                 *int
	BdgYear                      *int
	SupplierAgentID              *int
	DeliverCount                 *int
	DeliverComplete              *string
	PoTypeID                     *int
	StockPoTax                   *string
	StockPoVat                   *float64
	StockPoDiscount              *int
	StockPoDiscountTotal         *float64
	DeliverCancel                *string
	PoCancel                     *string
	CancelReason                 *string
	Note                         *string
	ReferenceID                  *int
	DeliveryRefDate              *time.Time
	PrRefNo                      *string
	ReceiveWoPo                  *string
	EntryStaff                   *string
	AuthorizeStaff               *string
	EntryDatetime                *string
	AuthorizeDatetime            *string
	HosGuid                      *string
	DeliverDay                   *int
	StockCoPoTypeID              *int
	OfferDate                    *time.Time
	ChequeNo                     *string
	ChequeDate                   *time.Time
	PaymentNo                    *string
	EndDate                      *time.Time
	TransportDay                 *int
	DepartmentID                 *int
	StockUserID                  *int
	StockBudgetUse               *float64
	StockBudgetRemain            *float64
	StockBudgetPrice             *float64
	Remark1                      *string
	Remark2                      *string
	Remark3                      *string
	Runnumber                    *int
	NumberYear                   *string
	NumberMonth                  *string
	StockPoDocumentID            *string
	StatusAppoveData             *string
	SignificantNumber            *string
	IsTemp                       *string
	RequestTagNo                 *string
	StockVendorID                *int
	StockPaidTypeID              *int
	StockPoDiscountAfterVat      *float64
	StockPoVatAmount             *float64
	PoDocNo                      *string
	StockPoRefID                 *int
	StockVendorDiscTypeID        *int
	StockVendorDiscPercent       *float64
	PaidStatusUpdateDatetime     *time.Time
	StockPoBeforeDiscountAmt     *float64
	StockPoVendorDiscAmt         *float64
	StockPoBeforeVatAmt          *float64
	PoDeliverRecvDate            *string
	PoDeliverRecvTime            *string
	PoDeliverInvStatTypeID       *int
	PoDeliverGdStatTypeID        *int
	PoDeliverConfirmTypeID       *int
	StockPoManualDiscAmt         *float64
	StockPoAdjBeforeVat          *float64
	PoEstDate                    *time.Time
	StockPoPriorityTypeID        *int
	PoEstDeliverDate             *time.Time
	PoContractNo                 *string
	PoDeliverAmount              *float64
	DeliverStop                  *string
	StockBudgetTransfer          *float64
	StockVendorContractID        *int
	DeliverStopDate              *string
	PoApprovalDate               *string
	PriceIncVat                  *string
	DeliverNoList                *string
	EgpProjectNo                 *string
	EgpControlNo                 *string
	GfmisPoNo                    *string
	RequestNoList                *string
	StockBudgetTypeID            *int
	AccPosted                    *string
	AccPostedDatetime            *string
	StockDeliverDocNoList        *string
	RoundTotalPrice              *string
	UseNoDiscount                *string
	FineAmount                   *float64
	StockPoAdjVat                *float64
}

var stockPoSyncLock sync.Mutex
var isStockPoSyncing bool

func SyncStockPos() {
	stockPoSyncLock.Lock()
	if isStockPoSyncing {
		log.Println("[StockPoSync] Skipping — already running")
		stockPoSyncLock.Unlock()
		return
	}
	isStockPoSyncing = true
	stockPoSyncLock.Unlock()

	defer func() {
		stockPoSyncLock.Lock()
		isStockPoSyncing = false
		stockPoSyncLock.Unlock()
		log.Println("[StockPoSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT stock_po_id, warehouse_id, ref_request_id, budget_id, stock_po_no, stock_po_date, supplier_id,
			       item_type, purchase_type, paid_status_id, stock_po_confirm, po_amount, po_item_amount, bdg_year,
			       supplier_agent_id, deliver_count, deliver_complete, po_type_id, stock_po_tax, stock_po_vat,
			       stock_po_discount, stock_po_discount_total, deliver_cancel, po_cancel, cancel_reason, note,
			       reference_id, delivery_ref_date, pr_ref_no, receive_wo_po, entry_staff, authorize_staff,
			       entry_datetime, authorize_datetime, hos_guid, deliver_day, stock_co_po_type_id, offer_date,
			       cheque_no, cheque_date, payment_no, end_date, transport_day, department_id, stock_user_id,
			       stock_budget_use, stock_budget_remain, stock_budget_price, remark_1, remark_2, remark_3,
			       runnumber, number_year, number_month, stock_po_document_id, status_appove_data, significant_number,
			       is_temp, request_tag_no, stock_vendor_id, stock_paid_type_id, stock_po_discount_after_vat,
			       stock_po_vat_amount, po_doc_no, stock_po_ref_id, stock_vendor_disc_type_id, stock_vendor_disc_percent,
			       paid_status_update_datetime, stock_po_before_discount_amt, stock_po_vendor_disc_amt, stock_po_before_vat_amt,
			       po_deliver_recv_date, po_deliver_recv_time, po_deliver_inv_stat_type_id, po_deliver_gd_stat_type_id,
			       po_deliver_confirm_type_id, stock_po_manual_disc_amt, stock_po_adj_before_vat, po_est_date,
			       stock_po_priority_type_id, po_est_deliver_date, po_contract_no, po_deliver_amount, deliver_stop,
			       stock_budget_transfer, stock_vendor_contract_id, deliver_stop_date, po_approval_date, price_inc_vat,
			       deliver_no_list, egp_project_no, egp_control_no, gfmis_po_no, request_no_list, stock_budget_type_id,
			       acc_posted, acc_posted_datetime, stock_deliver_doc_no_list, round_total_price, use_no_discount,
			       fine_amount, stock_po_adj_vat
			FROM stock_po
			WHERE stock_po_id > $1
			ORDER BY stock_po_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockPoSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sp StockPo
			if err := rows.Scan(&sp.StockPoID, &sp.WarehouseID, &sp.RefRequestID, &sp.BudgetID, &sp.StockPoNo,
				&sp.StockPoDate, &sp.SupplierID, &sp.ItemType, &sp.PurchaseType, &sp.PaidStatusID, &sp.StockPoConfirm,
				&sp.PoAmount, &sp.PoItemAmount, &sp.BdgYear, &sp.SupplierAgentID, &sp.DeliverCount, &sp.DeliverComplete,
				&sp.PoTypeID, &sp.StockPoTax, &sp.StockPoVat, &sp.StockPoDiscount, &sp.StockPoDiscountTotal,
				&sp.DeliverCancel, &sp.PoCancel, &sp.CancelReason, &sp.Note, &sp.ReferenceID, &sp.DeliveryRefDate,
				&sp.PrRefNo, &sp.ReceiveWoPo, &sp.EntryStaff, &sp.AuthorizeStaff, &sp.EntryDatetime, &sp.AuthorizeDatetime,
				&sp.HosGuid, &sp.DeliverDay, &sp.StockCoPoTypeID, &sp.OfferDate, &sp.ChequeNo, &sp.ChequeDate,
				&sp.PaymentNo, &sp.EndDate, &sp.TransportDay, &sp.DepartmentID, &sp.StockUserID, &sp.StockBudgetUse,
				&sp.StockBudgetRemain, &sp.StockBudgetPrice, &sp.Remark1, &sp.Remark2, &sp.Remark3, &sp.Runnumber,
				&sp.NumberYear, &sp.NumberMonth, &sp.StockPoDocumentID, &sp.StatusAppoveData, &sp.SignificantNumber,
				&sp.IsTemp, &sp.RequestTagNo, &sp.StockVendorID, &sp.StockPaidTypeID, &sp.StockPoDiscountAfterVat,
				&sp.StockPoVatAmount, &sp.PoDocNo, &sp.StockPoRefID, &sp.StockVendorDiscTypeID, &sp.StockVendorDiscPercent,
				&sp.PaidStatusUpdateDatetime, &sp.StockPoBeforeDiscountAmt, &sp.StockPoVendorDiscAmt, &sp.StockPoBeforeVatAmt,
				&sp.PoDeliverRecvDate, &sp.PoDeliverRecvTime, &sp.PoDeliverInvStatTypeID, &sp.PoDeliverGdStatTypeID,
				&sp.PoDeliverConfirmTypeID, &sp.StockPoManualDiscAmt, &sp.StockPoAdjBeforeVat, &sp.PoEstDate,
				&sp.StockPoPriorityTypeID, &sp.PoEstDeliverDate, &sp.PoContractNo, &sp.PoDeliverAmount, &sp.DeliverStop,
				&sp.StockBudgetTransfer, &sp.StockVendorContractID, &sp.DeliverStopDate, &sp.PoApprovalDate, &sp.PriceIncVat,
				&sp.DeliverNoList, &sp.EgpProjectNo, &sp.EgpControlNo, &sp.GfmisPoNo, &sp.RequestNoList, &sp.StockBudgetTypeID,
				&sp.AccPosted, &sp.AccPostedDatetime, &sp.StockDeliverDocNoList, &sp.RoundTotalPrice, &sp.UseNoDiscount,
				&sp.FineAmount, &sp.StockPoAdjVat); err != nil {
				log.Println("[StockPoSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_po (stock_po_id, warehouse_id, ref_request_id, budget_id, stock_po_no, stock_po_date, supplier_id,
				                     item_type, purchase_type, paid_status_id, stock_po_confirm, po_amount, po_item_amount, bdg_year,
				                     supplier_agent_id, deliver_count, deliver_complete, po_type_id, stock_po_tax, stock_po_vat,
				                     stock_po_discount, stock_po_discount_total, deliver_cancel, po_cancel, cancel_reason, note,
				                     reference_id, delivery_ref_date, pr_ref_no, receive_wo_po, entry_staff, authorize_staff,
				                     entry_datetime, authorize_datetime, hos_guid, deliver_day, stock_co_po_type_id, offer_date,
				                     cheque_no, cheque_date, payment_no, end_date, transport_day, department_id, stock_user_id,
				                     stock_budget_use, stock_budget_remain, stock_budget_price, remark_1, remark_2, remark_3,
				                     runnumber, number_year, number_month, stock_po_document_id, status_appove_data, significant_number,
				                     is_temp, request_tag_no, stock_vendor_id, stock_paid_type_id, stock_po_discount_after_vat,
				                     stock_po_vat_amount, po_doc_no, stock_po_ref_id, stock_vendor_disc_type_id, stock_vendor_disc_percent,
				                     paid_status_update_datetime, stock_po_before_discount_amt, stock_po_vendor_disc_amt, stock_po_before_vat_amt,
				                     po_deliver_recv_date, po_deliver_recv_time, po_deliver_inv_stat_type_id, po_deliver_gd_stat_type_id,
				                     po_deliver_confirm_type_id, stock_po_manual_disc_amt, stock_po_adj_before_vat, po_est_date,
				                     stock_po_priority_type_id, po_est_deliver_date, po_contract_no, po_deliver_amount, deliver_stop,
				                     stock_budget_transfer, stock_vendor_contract_id, deliver_stop_date, po_approval_date, price_inc_vat,
				                     deliver_no_list, egp_project_no, egp_control_no, gfmis_po_no, request_no_list, stock_budget_type_id,
				                     acc_posted, acc_posted_datetime, stock_deliver_doc_no_list, round_total_price, use_no_discount,
				                     fine_amount, stock_po_adj_vat)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
				        $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60,
				        $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80,
				        $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96, $97, $98, $99, $100)
				ON CONFLICT (stock_po_id) DO UPDATE SET
					warehouse_id = EXCLUDED.warehouse_id,
					ref_request_id = EXCLUDED.ref_request_id,
					budget_id = EXCLUDED.budget_id,
					stock_po_no = EXCLUDED.stock_po_no,
					stock_po_date = EXCLUDED.stock_po_date,
					supplier_id = EXCLUDED.supplier_id,
					item_type = EXCLUDED.item_type,
					purchase_type = EXCLUDED.purchase_type,
					paid_status_id = EXCLUDED.paid_status_id,
					stock_po_confirm = EXCLUDED.stock_po_confirm,
					po_amount = EXCLUDED.po_amount,
					po_item_amount = EXCLUDED.po_item_amount,
					bdg_year = EXCLUDED.bdg_year,
					supplier_agent_id = EXCLUDED.supplier_agent_id,
					deliver_count = EXCLUDED.deliver_count,
					deliver_complete = EXCLUDED.deliver_complete,
					po_type_id = EXCLUDED.po_type_id,
					stock_po_tax = EXCLUDED.stock_po_tax,
					stock_po_vat = EXCLUDED.stock_po_vat,
					stock_po_discount = EXCLUDED.stock_po_discount,
					stock_po_discount_total = EXCLUDED.stock_po_discount_total,
					deliver_cancel = EXCLUDED.deliver_cancel,
					po_cancel = EXCLUDED.po_cancel,
					cancel_reason = EXCLUDED.cancel_reason,
					note = EXCLUDED.note,
					reference_id = EXCLUDED.reference_id,
					delivery_ref_date = EXCLUDED.delivery_ref_date,
					pr_ref_no = EXCLUDED.pr_ref_no,
					receive_wo_po = EXCLUDED.receive_wo_po,
					entry_staff = EXCLUDED.entry_staff,
					authorize_staff = EXCLUDED.authorize_staff,
					entry_datetime = EXCLUDED.entry_datetime,
					authorize_datetime = EXCLUDED.authorize_datetime,
					hos_guid = EXCLUDED.hos_guid,
					deliver_day = EXCLUDED.deliver_day,
					stock_co_po_type_id = EXCLUDED.stock_co_po_type_id,
					offer_date = EXCLUDED.offer_date,
					cheque_no = EXCLUDED.cheque_no,
					cheque_date = EXCLUDED.cheque_date,
					payment_no = EXCLUDED.payment_no,
					end_date = EXCLUDED.end_date,
					transport_day = EXCLUDED.transport_day,
					department_id = EXCLUDED.department_id,
					stock_user_id = EXCLUDED.stock_user_id,
					stock_budget_use = EXCLUDED.stock_budget_use,
					stock_budget_remain = EXCLUDED.stock_budget_remain,
					stock_budget_price = EXCLUDED.stock_budget_price,
					remark_1 = EXCLUDED.remark_1,
					remark_2 = EXCLUDED.remark_2,
					remark_3 = EXCLUDED.remark_3,
					runnumber = EXCLUDED.runnumber,
					number_year = EXCLUDED.number_year,
					number_month = EXCLUDED.number_month,
					stock_po_document_id = EXCLUDED.stock_po_document_id,
					status_appove_data = EXCLUDED.status_appove_data,
					significant_number = EXCLUDED.significant_number,
					is_temp = EXCLUDED.is_temp,
					request_tag_no = EXCLUDED.request_tag_no,
					stock_vendor_id = EXCLUDED.stock_vendor_id,
					stock_paid_type_id = EXCLUDED.stock_paid_type_id,
					stock_po_discount_after_vat = EXCLUDED.stock_po_discount_after_vat,
					stock_po_vat_amount = EXCLUDED.stock_po_vat_amount,
					po_doc_no = EXCLUDED.po_doc_no,
					stock_po_ref_id = EXCLUDED.stock_po_ref_id,
					stock_vendor_disc_type_id = EXCLUDED.stock_vendor_disc_type_id,
					stock_vendor_disc_percent = EXCLUDED.stock_vendor_disc_percent,
					paid_status_update_datetime = EXCLUDED.paid_status_update_datetime,
					stock_po_before_discount_amt = EXCLUDED.stock_po_before_discount_amt,
					stock_po_vendor_disc_amt = EXCLUDED.stock_po_vendor_disc_amt,
					stock_po_before_vat_amt = EXCLUDED.stock_po_before_vat_amt,
					po_deliver_recv_date = EXCLUDED.po_deliver_recv_date,
					po_deliver_recv_time = EXCLUDED.po_deliver_recv_time,
					po_deliver_inv_stat_type_id = EXCLUDED.po_deliver_inv_stat_type_id,
					po_deliver_gd_stat_type_id = EXCLUDED.po_deliver_gd_stat_type_id,
					po_deliver_confirm_type_id = EXCLUDED.po_deliver_confirm_type_id,
					stock_po_manual_disc_amt = EXCLUDED.stock_po_manual_disc_amt,
					stock_po_adj_before_vat = EXCLUDED.stock_po_adj_before_vat,
					po_est_date = EXCLUDED.po_est_date,
					stock_po_priority_type_id = EXCLUDED.stock_po_priority_type_id,
					po_est_deliver_date = EXCLUDED.po_est_deliver_date,
					po_contract_no = EXCLUDED.po_contract_no,
					po_deliver_amount = EXCLUDED.po_deliver_amount,
					deliver_stop = EXCLUDED.deliver_stop,
					stock_budget_transfer = EXCLUDED.stock_budget_transfer,
					stock_vendor_contract_id = EXCLUDED.stock_vendor_contract_id,
					deliver_stop_date = EXCLUDED.deliver_stop_date,
					po_approval_date = EXCLUDED.po_approval_date,
					price_inc_vat = EXCLUDED.price_inc_vat,
					deliver_no_list = EXCLUDED.deliver_no_list,
					egp_project_no = EXCLUDED.egp_project_no,
					egp_control_no = EXCLUDED.egp_control_no,
					gfmis_po_no = EXCLUDED.gfmis_po_no,
					request_no_list = EXCLUDED.request_no_list,
					stock_budget_type_id = EXCLUDED.stock_budget_type_id,
					acc_posted = EXCLUDED.acc_posted,
					acc_posted_datetime = EXCLUDED.acc_posted_datetime,
					stock_deliver_doc_no_list = EXCLUDED.stock_deliver_doc_no_list,
					round_total_price = EXCLUDED.round_total_price,
					use_no_discount = EXCLUDED.use_no_discount,
					fine_amount = EXCLUDED.fine_amount,
					stock_po_adj_vat = EXCLUDED.stock_po_adj_vat
			`, sp.StockPoID, sp.WarehouseID, sp.RefRequestID, sp.BudgetID, sp.StockPoNo, sp.StockPoDate, sp.SupplierID,
				sp.ItemType, sp.PurchaseType, sp.PaidStatusID, sp.StockPoConfirm, sp.PoAmount, sp.PoItemAmount, sp.BdgYear,
				sp.SupplierAgentID, sp.DeliverCount, sp.DeliverComplete, sp.PoTypeID, sp.StockPoTax, sp.StockPoVat,
				sp.StockPoDiscount, sp.StockPoDiscountTotal, sp.DeliverCancel, sp.PoCancel, sp.CancelReason, sp.Note,
				sp.ReferenceID, sp.DeliveryRefDate, sp.PrRefNo, sp.ReceiveWoPo, sp.EntryStaff, sp.AuthorizeStaff,
				sp.EntryDatetime, sp.AuthorizeDatetime, sp.HosGuid, sp.DeliverDay, sp.StockCoPoTypeID, sp.OfferDate,
				sp.ChequeNo, sp.ChequeDate, sp.PaymentNo, sp.EndDate, sp.TransportDay, sp.DepartmentID, sp.StockUserID,
				sp.StockBudgetUse, sp.StockBudgetRemain, sp.StockBudgetPrice, sp.Remark1, sp.Remark2, sp.Remark3, sp.Runnumber,
				sp.NumberYear, sp.NumberMonth, sp.StockPoDocumentID, sp.StatusAppoveData, sp.SignificantNumber, sp.IsTemp,
				sp.RequestTagNo, sp.StockVendorID, sp.StockPaidTypeID, sp.StockPoDiscountAfterVat, sp.StockPoVatAmount,
				sp.PoDocNo, sp.StockPoRefID, sp.StockVendorDiscTypeID, sp.StockVendorDiscPercent, sp.PaidStatusUpdateDatetime,
				sp.StockPoBeforeDiscountAmt, sp.StockPoVendorDiscAmt, sp.StockPoBeforeVatAmt, sp.PoDeliverRecvDate,
				sp.PoDeliverRecvTime, sp.PoDeliverInvStatTypeID, sp.PoDeliverGdStatTypeID, sp.PoDeliverConfirmTypeID,
				sp.StockPoManualDiscAmt, sp.StockPoAdjBeforeVat, sp.PoEstDate, sp.StockPoPriorityTypeID, sp.PoEstDeliverDate,
				sp.PoContractNo, sp.PoDeliverAmount, sp.DeliverStop, sp.StockBudgetTransfer, sp.StockVendorContractID,
				sp.DeliverStopDate, sp.PoApprovalDate, sp.PriceIncVat, sp.DeliverNoList, sp.EgpProjectNo, sp.EgpControlNo,
				sp.GfmisPoNo, sp.RequestNoList, sp.StockBudgetTypeID, sp.AccPosted, sp.AccPostedDatetime,
				sp.StockDeliverDocNoList, sp.RoundTotalPrice, sp.UseNoDiscount, sp.FineAmount, sp.StockPoAdjVat)

			if err != nil {
				log.Printf("[StockPoSync] Insert/Update into new DB failed for ID %d: %v\n", sp.StockPoID, err)
			} else {
				rowCount++
				lastID = sp.StockPoID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockPoSync] Stock POs sync (legacy -> new) completed.")
}
