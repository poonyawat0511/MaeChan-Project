// // sync/sync.go
// package sync

// import (
// 	"context"
// 	"log"
// 	"time"

// 	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
// )

// type StockRequest struct {
// 	RequestID              int
// 	RequestDate            time.Time
// 	RequestNo              string
// 	RequestReceiveDate     *time.Time
// 	RequestWarehouseId     *int
// 	RequestComplete        *string
// 	UseDate                *time.Time
// 	StockPoId              *int
// 	HosGuid                *string
// 	BudgetYear             int
// 	StockSubject           string
// 	StockSubjectPerson     string
// 	SupplierId             *int
// 	DepartmentId           *int
// 	Note                   *string
// 	TransportDay           *int
// 	BudgetId               *int
// 	RunNumber              *int
// 	NumberYear             *string
// 	NumberMonth            *string
// 	StockRequestDocId      *string
// 	ProjectId              *int
// 	StockUserApprove       *int
// 	StockApproveDate       *time.Time
// 	StockUser              *int
// 	StockRequestDocumentId *string
// 	ProjectPlanId          *int
// 	RequestAllComplete     *string
// 	BudgetRunNo            *int
// 	Approve                *string
// 	RequestTagNo           *string
// 	RequestTime            *string
// 	PurchaseType           *int
// 	StockBudgetTotal       float64
// 	StockBudgetUse         float64
// 	StockBudgetRemain      float64
// 	Trimester              *int
// 	VatPercent             float64
// 	RequestReason          *string
// 	RequestTotalPrice      float64
// 	RequestItemCount       int
// 	StockBudgetPrUse       float64
// 	StockBudgetPrRemain    float64
// 	OfficerList            *string
// 	StockPoNoList          *string
// 	StockBudgetTypeId      *int
// 	DepRequestNoList       *string
// }

// func SyncStockRequests() {
// 	ctx := context.Background()

// 	// Step 1: Build map of request_ids from legacy DB
// 	legacyIDs := make(map[int]bool)
// 	rows, err := db.LegacyDB.Query(ctx, `SELECT request_id FROM stock_request`)
// 	if err != nil {
// 		log.Println("[Sync] Failed to load legacy request_ids:", err)
// 		return
// 	}
// 	for rows.Next() {
// 		var id int
// 		if err := rows.Scan(&id); err == nil {
// 			legacyIDs[id] = true
// 		}
// 	}
// 	rows.Close()
// 	log.Printf("[Sync] Loaded %d request_ids from legacy DB\n", len(legacyIDs))

// 	// Step 2: Fetch all rows from new DB
// 	rows, err = db.NewDB.Query(ctx, `
// 		SELECT request_id, request_date, request_no, request_receive_date, request_warehouse_id,
// 		       request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
// 		       stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
// 		       runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
// 		       stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
// 		       request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
// 		       stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
// 		       request_reason, request_total_price, request_item_count, stock_budget_pr_use,
// 		       stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
// 		FROM stock_request ORDER BY request_id
// 	`)
// 	if err != nil {
// 		log.Println("[Sync] Failed to load new rows:", err)
// 		return
// 	}
// 	defer rows.Close()

// 	syncCount := 0
// 	for rows.Next() {
// 		var r StockRequest
// 		err := rows.Scan(
// 			&r.RequestID, &r.RequestDate, &r.RequestNo, &r.RequestReceiveDate, &r.RequestWarehouseId,
// 			&r.RequestComplete, &r.UseDate, &r.StockPoId, &r.HosGuid, &r.BudgetYear, &r.StockSubject,
// 			&r.StockSubjectPerson, &r.SupplierId, &r.DepartmentId, &r.Note, &r.TransportDay, &r.BudgetId,
// 			&r.RunNumber, &r.NumberYear, &r.NumberMonth, &r.StockRequestDocId, &r.ProjectId, &r.StockUserApprove,
// 			&r.StockApproveDate, &r.StockUser, &r.StockRequestDocumentId, &r.ProjectPlanId,
// 			&r.RequestAllComplete, &r.BudgetRunNo, &r.Approve, &r.RequestTagNo, &r.RequestTime, &r.PurchaseType,
// 			&r.StockBudgetTotal, &r.StockBudgetUse, &r.StockBudgetRemain, &r.Trimester, &r.VatPercent,
// 			&r.RequestReason, &r.RequestTotalPrice, &r.RequestItemCount, &r.StockBudgetPrUse,
// 			&r.StockBudgetPrRemain, &r.OfficerList, &r.StockPoNoList, &r.StockBudgetTypeId, &r.DepRequestNoList,
// 		)
// 		if err != nil {
// 			log.Println("[Sync] Scan error:", err)
// 			continue
// 		}

// 		if legacyIDs[r.RequestID] {
// 			continue // already exists
// 		}

// 		_, err = db.LegacyDB.Exec(ctx, `
// 			INSERT INTO stock_request (
// 				request_id, request_date, request_no, request_receive_date, request_warehouse_id,
// 				request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
// 				stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
// 				runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
// 				stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
// 				request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
// 				stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
// 				request_reason, request_total_price, request_item_count, stock_budget_pr_use,
// 				stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
// 			) VALUES (
// 				$1, $2, $3, $4, $5,
// 				$6, $7, $8, $9, $10, $11,
// 				$12, $13, $14, $15, $16, $17,
// 				$18, $19, $20, $21, $22, $23,
// 				$24, $25, $26, $27,
// 				$28, $29, $30, $31, $32, $33,
// 				$34, $35, $36, $37, $38,
// 				$39, $40, $41, $42,
// 				$43, $44, $45, $46, $47
// 			)
// 		`,
// 			r.RequestID, r.RequestDate, r.RequestNo, r.RequestReceiveDate, r.RequestWarehouseId,
// 			r.RequestComplete, r.UseDate, r.StockPoId, r.HosGuid, r.BudgetYear, r.StockSubject,
// 			r.StockSubjectPerson, r.SupplierId, r.DepartmentId, r.Note, r.TransportDay, r.BudgetId,
// 			r.RunNumber, r.NumberYear, r.NumberMonth, r.StockRequestDocId, r.ProjectId, r.StockUserApprove,
// 			r.StockApproveDate, r.StockUser, r.StockRequestDocumentId, r.ProjectPlanId,
// 			r.RequestAllComplete, r.BudgetRunNo, r.Approve, r.RequestTagNo, r.RequestTime, r.PurchaseType,
// 			r.StockBudgetTotal, r.StockBudgetUse, r.StockBudgetRemain, r.Trimester, r.VatPercent,
// 			r.RequestReason, r.RequestTotalPrice, r.RequestItemCount, r.StockBudgetPrUse,
// 			r.StockBudgetPrRemain, r.OfficerList, r.StockPoNoList, r.StockBudgetTypeId, r.DepRequestNoList,
// 		)
// 		if err != nil {
// 			log.Printf("[Sync] Failed to insert ID %d: %v\n", r.RequestID, err)
// 		} else {
// 			syncCount++
// 			log.Printf("[Sync] Inserted stock_request ID %d\n", r.RequestID)
// 		}
// 	}

// 	log.Printf("[Sync] Completed. %d new records synced.\n", syncCount)
// }

// sync/sync.go v2
// package sync

// import (
// 	"context"
// 	"log"
// 	"sync"
// 	"time"

// 	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
// )

// var syncLock sync.Mutex
// var isSyncing bool

// type StockRequest struct {
// 	RequestID              int
// 	RequestDate            time.Time
// 	RequestNo              string
// 	RequestReceiveDate     *time.Time
// 	RequestWarehouseId     *int
// 	RequestComplete        *string
// 	UseDate                *time.Time
// 	StockPoId              *int
// 	HosGuid                *string
// 	BudgetYear             int
// 	StockSubject           string
// 	StockSubjectPerson     string
// 	SupplierId             *int
// 	DepartmentId           *int
// 	Note                   *string
// 	TransportDay           *int
// 	BudgetId               *int
// 	RunNumber              *int
// 	NumberYear             *string
// 	NumberMonth            *string
// 	StockRequestDocId      *string
// 	ProjectId              *int
// 	StockUserApprove       *int
// 	StockApproveDate       *time.Time
// 	StockUser              *int
// 	StockRequestDocumentId *string
// 	ProjectPlanId          *int
// 	RequestAllComplete     *string
// 	BudgetRunNo            *int
// 	Approve                *string
// 	RequestTagNo           *string
// 	RequestTime            *string
// 	PurchaseType           *int
// 	StockBudgetTotal       float64
// 	StockBudgetUse         float64
// 	StockBudgetRemain      float64
// 	Trimester              *int
// 	VatPercent             float64
// 	RequestReason          *string
// 	RequestTotalPrice      float64
// 	RequestItemCount       int
// 	StockBudgetPrUse       float64
// 	StockBudgetPrRemain    float64
// 	OfficerList            *string
// 	StockPoNoList          *string
// 	StockBudgetTypeId      *int
// 	DepRequestNoList       *string
// }

// func SyncStockRequests() {
// 	syncLock.Lock()
// 	if isSyncing {
// 		log.Println("[Sync] Already in progress. Skipping this trigger.")
// 		syncLock.Unlock()
// 		return
// 	}
// 	isSyncing = true
// 	syncLock.Unlock()

// 	defer func() {
// 		syncLock.Lock()
// 		isSyncing = false
// 		syncLock.Unlock()
// 		log.Println("[Sync] Sync released.")
// 	}()

// 	ctx := context.Background()

// 	legacyIDs := make(map[int]bool)
// 	rows, err := db.LegacyDB.Query(ctx, `SELECT request_id FROM stock_request`)
// 	if err != nil {
// 		log.Println("[Sync] Failed to load legacy request_ids:", err)
// 		return
// 	}
// 	for rows.Next() {
// 		var id int
// 		if err := rows.Scan(&id); err == nil {
// 			legacyIDs[id] = true
// 		}
// 	}
// 	rows.Close()
// 	log.Printf("[Sync] Loaded %d request_ids from legacy DB\n", len(legacyIDs))

// 	rows, err = db.NewDB.Query(ctx, `
// 		SELECT request_id, request_date, request_no, request_receive_date, request_warehouse_id,
// 		       request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
// 		       stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
// 		       runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
// 		       stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
// 		       request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
// 		       stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
// 		       request_reason, request_total_price, request_item_count, stock_budget_pr_use,
// 		       stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
// 		FROM stock_request ORDER BY request_id
// 	`)
// 	if err != nil {
// 		log.Println("[Sync] Failed to load new rows:", err)
// 		return
// 	}
// 	defer rows.Close()

// 	syncCount := 0
// 	for rows.Next() {
// 		var r StockRequest
// 		err := rows.Scan(
// 			&r.RequestID, &r.RequestDate, &r.RequestNo, &r.RequestReceiveDate, &r.RequestWarehouseId,
// 			&r.RequestComplete, &r.UseDate, &r.StockPoId, &r.HosGuid, &r.BudgetYear, &r.StockSubject,
// 			&r.StockSubjectPerson, &r.SupplierId, &r.DepartmentId, &r.Note, &r.TransportDay, &r.BudgetId,
// 			&r.RunNumber, &r.NumberYear, &r.NumberMonth, &r.StockRequestDocId, &r.ProjectId, &r.StockUserApprove,
// 			&r.StockApproveDate, &r.StockUser, &r.StockRequestDocumentId, &r.ProjectPlanId,
// 			&r.RequestAllComplete, &r.BudgetRunNo, &r.Approve, &r.RequestTagNo, &r.RequestTime, &r.PurchaseType,
// 			&r.StockBudgetTotal, &r.StockBudgetUse, &r.StockBudgetRemain, &r.Trimester, &r.VatPercent,
// 			&r.RequestReason, &r.RequestTotalPrice, &r.RequestItemCount, &r.StockBudgetPrUse,
// 			&r.StockBudgetPrRemain, &r.OfficerList, &r.StockPoNoList, &r.StockBudgetTypeId, &r.DepRequestNoList,
// 		)
// 		if err != nil {
// 			log.Println("[Sync] Scan error:", err)
// 			continue
// 		}

// 		if legacyIDs[r.RequestID] {
// 			continue
// 		}

// 		_, err = db.LegacyDB.Exec(ctx, `
// 			INSERT INTO stock_request (
// 				request_id, request_date, request_no, request_receive_date, request_warehouse_id,
// 				request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
// 				stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
// 				runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
// 				stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
// 				request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
// 				stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
// 				request_reason, request_total_price, request_item_count, stock_budget_pr_use,
// 				stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
// 			) VALUES (
// 				$1, $2, $3, $4, $5,
// 				$6, $7, $8, $9, $10, $11,
// 				$12, $13, $14, $15, $16, $17,
// 				$18, $19, $20, $21, $22, $23,
// 				$24, $25, $26, $27,
// 				$28, $29, $30, $31, $32, $33,
// 				$34, $35, $36, $37, $38,
// 				$39, $40, $41, $42,
// 				$43, $44, $45, $46, $47
// 			)
// 		`,
// 			r.RequestID, r.RequestDate, r.RequestNo, r.RequestReceiveDate, r.RequestWarehouseId,
// 			r.RequestComplete, r.UseDate, r.StockPoId, r.HosGuid, r.BudgetYear, r.StockSubject,
// 			r.StockSubjectPerson, r.SupplierId, r.DepartmentId, r.Note, r.TransportDay, r.BudgetId,
// 			r.RunNumber, r.NumberYear, r.NumberMonth, r.StockRequestDocId, r.ProjectId, r.StockUserApprove,
// 			r.StockApproveDate, r.StockUser, r.StockRequestDocumentId, r.ProjectPlanId,
// 			r.RequestAllComplete, r.BudgetRunNo, r.Approve, r.RequestTagNo, r.RequestTime, r.PurchaseType,
// 			r.StockBudgetTotal, r.StockBudgetUse, r.StockBudgetRemain, r.Trimester, r.VatPercent,
// 			r.RequestReason, r.RequestTotalPrice, r.RequestItemCount, r.StockBudgetPrUse,
// 			r.StockBudgetPrRemain, r.OfficerList, r.StockPoNoList, r.StockBudgetTypeId, r.DepRequestNoList,
// 		)
// 		if err != nil {
// 			log.Printf("[Sync] Failed to insert ID %d: %v\n", r.RequestID, err)
// 		} else {
// 			syncCount++
// 			log.Printf("[Sync] Inserted stock_request ID %d\n", r.RequestID)
// 		}
// 	}

// 	log.Printf("[Sync] Completed. %d new records synced.\n", syncCount)
// }

// sync/sync.go v3
package sync

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

var syncLock sync.Mutex
var isSyncing bool

type StockRequest struct {
	RequestID              int
	RequestDate            time.Time
	RequestNo              string
	RequestReceiveDate     *time.Time
	RequestWarehouseId     *int
	RequestComplete        *string
	UseDate                *time.Time
	StockPoId              *int
	HosGuid                *string
	BudgetYear             int
	StockSubject           string
	StockSubjectPerson     string
	SupplierId             *int
	DepartmentId           *int
	Note                   *string
	TransportDay           *int
	BudgetId               *int
	RunNumber              *int
	NumberYear             *string
	NumberMonth            *string
	StockRequestDocId      *string
	ProjectId              *int
	StockUserApprove       *int
	StockApproveDate       *time.Time
	StockUser              *int
	StockRequestDocumentId *string
	ProjectPlanId          *int
	RequestAllComplete     *string
	BudgetRunNo            *int
	Approve                *string
	RequestTagNo           *string
	RequestTime            *string
	PurchaseType           *int
	StockBudgetTotal       float64
	StockBudgetUse         float64
	StockBudgetRemain      float64
	Trimester              *int
	VatPercent             float64
	RequestReason          *string
	RequestTotalPrice      float64
	RequestItemCount       int
	StockBudgetPrUse       float64
	StockBudgetPrRemain    float64
	OfficerList            *string
	StockPoNoList          *string
	StockBudgetTypeId      *int
	DepRequestNoList       *string
}

func SyncAll() {
	syncLock.Lock()
	if isSyncing {
		log.Println("[Sync] Skipping — already running")
		syncLock.Unlock()
		return
	}
	isSyncing = true
	syncLock.Unlock()

	defer func() {
		syncLock.Lock()
		isSyncing = false
		syncLock.Unlock()
		log.Println("[Sync] Unlock completed")
	}()

	SyncStockRequests()
	SyncBackFromLegacy()
	SyncStatusFromNewToLegacy()
}

func SyncStockRequests() {

	ctx := context.Background()

	legacyIDs := make(map[int]bool)
	rows, err := db.LegacyDB.Query(ctx, `SELECT request_id FROM stock_request`)
	if err != nil {
		log.Println("[Sync] Failed to load legacy request_ids:", err)
		return
	}
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err == nil {
			legacyIDs[id] = true
		}
	}
	rows.Close()
	log.Printf("[Sync] Loaded %d request_ids from legacy DB\n", len(legacyIDs))

	r, err := db.NewDB.Query(ctx, `
		SELECT request_id, request_date, request_no, request_receive_date, request_warehouse_id,
		       request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
		       stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
		       runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
		       stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
		       request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
		       stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
		       request_reason, request_total_price, request_item_count, stock_budget_pr_use,
		       stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
		FROM stock_request ORDER BY request_id
	`)
	if err != nil {
		log.Println("[Sync] Failed to load new rows:", err)
		return
	}
	defer r.Close()

	syncCount := 0
	for r.Next() {
		var s StockRequest
		err := r.Scan(
			&s.RequestID, &s.RequestDate, &s.RequestNo, &s.RequestReceiveDate, &s.RequestWarehouseId,
			&s.RequestComplete, &s.UseDate, &s.StockPoId, &s.HosGuid, &s.BudgetYear, &s.StockSubject,
			&s.StockSubjectPerson, &s.SupplierId, &s.DepartmentId, &s.Note, &s.TransportDay, &s.BudgetId,
			&s.RunNumber, &s.NumberYear, &s.NumberMonth, &s.StockRequestDocId, &s.ProjectId, &s.StockUserApprove,
			&s.StockApproveDate, &s.StockUser, &s.StockRequestDocumentId, &s.ProjectPlanId,
			&s.RequestAllComplete, &s.BudgetRunNo, &s.Approve, &s.RequestTagNo, &s.RequestTime, &s.PurchaseType,
			&s.StockBudgetTotal, &s.StockBudgetUse, &s.StockBudgetRemain, &s.Trimester, &s.VatPercent,
			&s.RequestReason, &s.RequestTotalPrice, &s.RequestItemCount, &s.StockBudgetPrUse,
			&s.StockBudgetPrRemain, &s.OfficerList, &s.StockPoNoList, &s.StockBudgetTypeId, &s.DepRequestNoList,
		)
		if err != nil {
			log.Println("[Sync] Scan error:", err)
			continue
		}

		if legacyIDs[s.RequestID] {
			continue
		}

		_, err = db.LegacyDB.Exec(ctx, `
			INSERT INTO stock_request (
				request_id, request_date, request_no, request_receive_date, request_warehouse_id,
				request_complete, use_date, stock_po_id, hos_guid, bdg_year, stock_subject,
				stock_subject_person, supplier_id, department_id, note, transport_day, budget_id,
				runnumber, number_year, number_month, stock_request_doc_id, project_id, stock_user_approve_id,
				stock_approve_date, stock_user_id, stock_request_document_id, project_plan_id,
				request_all_complete, budget_runno, approve, request_tag_no, request_time, purchase_type,
				stock_budget_total, stock_budget_use, stock_budget_remain, trimester, vat_percent,
				request_reason, request_total_price, request_item_count, stock_budget_pr_use,
				stock_budget_pr_remain, officer_list, stock_po_no_list, stock_budget_type_id, dep_request_no_list
			) VALUES (
				$1, $2, $3, $4, $5,
				$6, $7, $8, $9, $10, $11,
				$12, $13, $14, $15, $16, $17,
				$18, $19, $20, $21, $22, $23,
				$24, $25, $26, $27,
				$28, $29, $30, $31, $32, $33,
				$34, $35, $36, $37, $38,
				$39, $40, $41, $42,
				$43, $44, $45, $46, $47
			)
		`,
			s.RequestID, s.RequestDate, s.RequestNo, s.RequestReceiveDate, s.RequestWarehouseId,
			s.RequestComplete, s.UseDate, s.StockPoId, s.HosGuid, s.BudgetYear, s.StockSubject,
			s.StockSubjectPerson, s.SupplierId, s.DepartmentId, s.Note, s.TransportDay, s.BudgetId,
			s.RunNumber, s.NumberYear, s.NumberMonth, s.StockRequestDocId, s.ProjectId, s.StockUserApprove,
			s.StockApproveDate, s.StockUser, s.StockRequestDocumentId, s.ProjectPlanId,
			s.RequestAllComplete, s.BudgetRunNo, s.Approve, s.RequestTagNo, s.RequestTime, s.PurchaseType,
			s.StockBudgetTotal, s.StockBudgetUse, s.StockBudgetRemain, s.Trimester, s.VatPercent,
			s.RequestReason, s.RequestTotalPrice, s.RequestItemCount, s.StockBudgetPrUse,
			s.StockBudgetPrRemain, s.OfficerList, s.StockPoNoList, s.StockBudgetTypeId, s.DepRequestNoList,
		)
		if err != nil {
			log.Printf("[Sync] Failed to insert ID %d: %v\n", s.RequestID, err)
		} else {
			syncCount++
			log.Printf("[Sync] Inserted stock_request ID %d\n", s.RequestID)
		}
	}

	log.Printf("[Sync] Completed. %d new records synced.\n", syncCount)
}

func SyncBackFromLegacy() {
	ctx := context.Background()

	type LegacyStatus struct {
		RequestID        int
		Approve          *string
		RequestComplete  *string
		StockApproveDate *time.Time
	}

	rows, err := db.LegacyDB.Query(ctx, `
		SELECT request_id, approve, request_complete, stock_approve_date
		FROM stock_request
		WHERE approve IS NOT NULL OR request_complete IS NOT NULL
	`)
	if err != nil {
		log.Println("[SyncBack] Failed to query legacy rows:", err)
		return
	}
	defer rows.Close()

	updated := 0
	for rows.Next() {
		var l LegacyStatus
		if err := rows.Scan(&l.RequestID, &l.Approve, &l.RequestComplete, &l.StockApproveDate); err != nil {
			log.Println("[SyncBack] Scan error:", err)
			continue
		}

		var newApprove *string
		var newRequestComplete *string
		var newStockApproveDate *time.Time

		err = db.NewDB.QueryRow(ctx, `
			SELECT approve, request_complete, stock_approve_date
			FROM stock_request WHERE request_id = $1
		`, l.RequestID).Scan(&newApprove, &newRequestComplete, &newStockApproveDate)
		if err != nil {
			log.Printf("[SyncBack] Skipping request_id %d (not found in new DB): %v\n", l.RequestID, err)
			continue
		}

		shouldUpdate := false
		if (l.Approve != nil && (newApprove == nil || *newApprove != *l.Approve)) ||
			(l.RequestComplete != nil && (newRequestComplete == nil || *newRequestComplete != *l.RequestComplete)) {
			shouldUpdate = true
		}

		if shouldUpdate {
			_, err := db.NewDB.Exec(ctx, `
				UPDATE stock_request
				SET approve = COALESCE($1, approve),
				    request_complete = COALESCE($2, request_complete),
				    stock_approve_date = COALESCE($3, stock_approve_date)
				WHERE request_id = $4
			`, l.Approve, l.RequestComplete, l.StockApproveDate, l.RequestID)
			if err != nil {
				log.Printf("[SyncBack] Failed to update request_id %d in new DB: %v\n", l.RequestID, err)
			} else {
				updated++
				log.Printf("[SyncBack] Updated request_id %d in new DB\n", l.RequestID)
			}
		}
	}

	log.Printf("[SyncBack] Completed. %d rows updated from legacy to new DB.\n", updated)
}

func SyncStatusFromNewToLegacy() {
	ctx := context.Background()

	type NewStatus struct {
		RequestID        int
		Approve          *string
		RequestComplete  *string
		StockApproveDate *time.Time
		StockUserApprove *int
	}

	rows, err := db.NewDB.Query(ctx, `
		SELECT request_id, approve, request_complete, stock_approve_date, stock_user_approve_id
		FROM stock_request
		WHERE approve IS NOT NULL OR request_complete IS NOT NULL OR stock_user_approve_id IS NOT NULL
	`)
	if err != nil {
		log.Println("[SyncStatus] Failed to query new DB:", err)
		return
	}
	defer rows.Close()

	updated := 0
	for rows.Next() {
		var n NewStatus
		if err := rows.Scan(&n.RequestID, &n.Approve, &n.RequestComplete, &n.StockApproveDate, &n.StockUserApprove); err != nil {
			log.Println("[SyncStatus] Scan error:", err)
			continue
		}

		var legacyApprove *string
		var legacyRequestComplete *string
		var legacyStockApproveDate *time.Time
		var legacyStockUserApprove *int

		err = db.LegacyDB.QueryRow(ctx, `
			SELECT approve, request_complete, stock_approve_date, stock_user_approve_id
			FROM stock_request WHERE request_id = $1
		`, n.RequestID).Scan(&legacyApprove, &legacyRequestComplete, &legacyStockApproveDate, &legacyStockUserApprove)
		if err != nil {
			log.Printf("[SyncStatus] Skipping request_id %d (not found in legacy DB): %v\n", n.RequestID, err)
			continue
		}

		shouldUpdate := false
		if (n.Approve != nil && (legacyApprove == nil || *legacyApprove != *n.Approve)) ||
			(n.RequestComplete != nil && (legacyRequestComplete == nil || *legacyRequestComplete != *n.RequestComplete)) ||
			(n.StockUserApprove != nil && (legacyStockUserApprove == nil || *legacyStockUserApprove != *n.StockUserApprove)) {
			shouldUpdate = true
		}

		if shouldUpdate {
			_, err := db.LegacyDB.Exec(ctx, `
				UPDATE stock_request
				SET approve = COALESCE($1, approve),
				    request_complete = COALESCE($2, request_complete),
				    stock_approve_date = COALESCE($3, stock_approve_date),
				    stock_user_approve_id = COALESCE($4, stock_user_approve_id)
				WHERE request_id = $5
			`, n.Approve, n.RequestComplete, n.StockApproveDate, n.StockUserApprove, n.RequestID)
			if err != nil {
				log.Printf("[SyncStatus] Failed to update request_id %d in legacy DB: %v\n", n.RequestID, err)
			} else {
				updated++
				log.Printf("[SyncStatus] Updated request_id %d in legacy DB\n", n.RequestID)
			}
		}
	}

	log.Printf("[SyncStatus] Completed. %d rows updated from new DB to legacy DB.\n", updated)
}
