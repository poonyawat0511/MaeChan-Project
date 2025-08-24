package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type StockWarehouse struct {
	WarehouseID                      int
	WarehouseName                    *string
	WarehouseOfficerPoName           *string
	WarehouseOfficerPoPosition       *string
	WarehouseOfficerDirectorName     *string
	WarehouseOfficerDirectorPosition *string
	WarehouseOfficerChairmanName     *string
	WarehouseOfficerChairmanPosition *string
	WarehouseOfficerBoardName1       *string
	WarehouseOfficerBoardPosition1   *string
	WarehouseOfficerBoardName2       *string
	WarehouseOfficerBoardPosition2   *string
	OldCode                          *string
	HosGuid                          *string
	WarehouseResponsibleOfficer      *string
	WarehouseLocation                *string
	WarehouseActive                  *string
	WarehouseCode                    *string
	WarehouseWritePoName             *string
	WarehouseWritePoPosition         *string
	WarehouseIssueName               *string
	WarehouseIssuePosition           *string
	WarehousePrefact                 *string
	WarehouseDefault                 *string
	DocumentPrefix                   *string
	DeliverDocumentPrefix            *string
}

var stockWarehouseSyncLock sync.Mutex
var isStockWarehouseSyncing bool

func SyncStockWarehouses() {
	stockWarehouseSyncLock.Lock()
	if isStockWarehouseSyncing {
		log.Println("[StockWarehouseSync] Skipping — already running")
		stockWarehouseSyncLock.Unlock()
		return
	}
	isStockWarehouseSyncing = true
	stockWarehouseSyncLock.Unlock()

	defer func() {
		stockWarehouseSyncLock.Lock()
		isStockWarehouseSyncing = false
		stockWarehouseSyncLock.Unlock()
		log.Println("[StockWarehouseSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT warehouse_id, warehouse_name, warehouse_officer_po_name, warehouse_officer_po_position,
			       warehouse_officer_director_name, warehouse_officer_director_position, warehouse_officer_chairman_name,
			       warehouse_officer_chairman_position, warehouse_officer_board_name1, warehouse_officer_board_position1,
			       warehouse_officer_board_name2, warehouse_officer_board_position2, oldcode, hos_guid,
			       warehouse_responsible_officer, warehouse_location, warehouse_active, warehouse_code,
			       warehouse_write_po_name, warehouse_write_po_position, warehouse_issue_name, warehouse_issue_position,
			       warehouse_prefact, warehouse_default, document_prefix, deliver_document_prefix
			FROM stock_warehouse
			WHERE warehouse_id > $1
			ORDER BY warehouse_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[StockWarehouseSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var sw StockWarehouse
			if err := rows.Scan(&sw.WarehouseID, &sw.WarehouseName, &sw.WarehouseOfficerPoName, &sw.WarehouseOfficerPoPosition,
				&sw.WarehouseOfficerDirectorName, &sw.WarehouseOfficerDirectorPosition, &sw.WarehouseOfficerChairmanName,
				&sw.WarehouseOfficerChairmanPosition, &sw.WarehouseOfficerBoardName1, &sw.WarehouseOfficerBoardPosition1,
				&sw.WarehouseOfficerBoardName2, &sw.WarehouseOfficerBoardPosition2, &sw.OldCode, &sw.HosGuid,
				&sw.WarehouseResponsibleOfficer, &sw.WarehouseLocation, &sw.WarehouseActive, &sw.WarehouseCode,
				&sw.WarehouseWritePoName, &sw.WarehouseWritePoPosition, &sw.WarehouseIssueName, &sw.WarehouseIssuePosition,
				&sw.WarehousePrefact, &sw.WarehouseDefault, &sw.DocumentPrefix, &sw.DeliverDocumentPrefix); err != nil {
				log.Println("[StockWarehouseSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO stock_warehouse (warehouse_id, warehouse_name, warehouse_officer_po_name, warehouse_officer_po_position,
				                           warehouse_officer_director_name, warehouse_officer_director_position, warehouse_officer_chairman_name,
				                           warehouse_officer_chairman_position, warehouse_officer_board_name1, warehouse_officer_board_position1,
				                           warehouse_officer_board_name2, warehouse_officer_board_position2, oldcode, hos_guid,
				                           warehouse_responsible_officer, warehouse_location, warehouse_active, warehouse_code,
				                           warehouse_write_po_name, warehouse_write_po_position, warehouse_issue_name, warehouse_issue_position,
				                           warehouse_prefact, warehouse_default, document_prefix, deliver_document_prefix)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
				        $21, $22, $23, $24, $25, $26)
				ON CONFLICT (warehouse_id) DO UPDATE SET
					warehouse_name = EXCLUDED.warehouse_name,
					warehouse_officer_po_name = EXCLUDED.warehouse_officer_po_name,
					warehouse_officer_po_position = EXCLUDED.warehouse_officer_po_position,
					warehouse_officer_director_name = EXCLUDED.warehouse_officer_director_name,
					warehouse_officer_director_position = EXCLUDED.warehouse_officer_director_position,
					warehouse_officer_chairman_name = EXCLUDED.warehouse_officer_chairman_name,
					warehouse_officer_chairman_position = EXCLUDED.warehouse_officer_chairman_position,
					warehouse_officer_board_name1 = EXCLUDED.warehouse_officer_board_name1,
					warehouse_officer_board_position1 = EXCLUDED.warehouse_officer_board_position1,
					warehouse_officer_board_name2 = EXCLUDED.warehouse_officer_board_name2,
					warehouse_officer_board_position2 = EXCLUDED.warehouse_officer_board_position2,
					oldcode = EXCLUDED.oldcode,
					hos_guid = EXCLUDED.hos_guid,
					warehouse_responsible_officer = EXCLUDED.warehouse_responsible_officer,
					warehouse_location = EXCLUDED.warehouse_location,
					warehouse_active = EXCLUDED.warehouse_active,
					warehouse_code = EXCLUDED.warehouse_code,
					warehouse_write_po_name = EXCLUDED.warehouse_write_po_name,
					warehouse_write_po_position = EXCLUDED.warehouse_write_po_position,
					warehouse_issue_name = EXCLUDED.warehouse_issue_name,
					warehouse_issue_position = EXCLUDED.warehouse_issue_position,
					warehouse_prefact = EXCLUDED.warehouse_prefact,
					warehouse_default = EXCLUDED.warehouse_default,
					document_prefix = EXCLUDED.document_prefix,
					deliver_document_prefix = EXCLUDED.deliver_document_prefix
			`, sw.WarehouseID, sw.WarehouseName, sw.WarehouseOfficerPoName, sw.WarehouseOfficerPoPosition,
				sw.WarehouseOfficerDirectorName, sw.WarehouseOfficerDirectorPosition, sw.WarehouseOfficerChairmanName,
				sw.WarehouseOfficerChairmanPosition, sw.WarehouseOfficerBoardName1, sw.WarehouseOfficerBoardPosition1,
				sw.WarehouseOfficerBoardName2, sw.WarehouseOfficerBoardPosition2, sw.OldCode, sw.HosGuid,
				sw.WarehouseResponsibleOfficer, sw.WarehouseLocation, sw.WarehouseActive, sw.WarehouseCode,
				sw.WarehouseWritePoName, sw.WarehouseWritePoPosition, sw.WarehouseIssueName, sw.WarehouseIssuePosition,
				sw.WarehousePrefact, sw.WarehouseDefault, sw.DocumentPrefix, sw.DeliverDocumentPrefix)

			if err != nil {
				log.Printf("[StockWarehouseSync] Insert/Update into new DB failed for ID %d: %v\n", sw.WarehouseID, err)
			} else {
				rowCount++
				lastID = sw.WarehouseID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[StockWarehouseSync] Stock warehouses sync (legacy -> new) completed.")
}
