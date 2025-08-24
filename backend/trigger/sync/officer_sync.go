package sync

import (
	"context"
	"log"
	"sync"

	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
)

type Officer struct {
	OfficerID   int
	OfficerName *string
}

var officerSyncLock sync.Mutex
var isOfficerSyncing bool

func SyncOfficers() {
	officerSyncLock.Lock()
	if isOfficerSyncing {
		log.Println("[OfficerSync] Skipping — already running")
		officerSyncLock.Unlock()
		return
	}
	isOfficerSyncing = true
	officerSyncLock.Unlock()

	defer func() {
		officerSyncLock.Lock()
		isOfficerSyncing = false
		officerSyncLock.Unlock()
		log.Println("[OfficerSync] Unlock completed")
	}()

	ctx := context.Background()

	var lastID int
	for {
		rows, err := db.LegacyDB.Query(ctx, `
			SELECT officer_id, officer_name
			FROM officer
			WHERE officer_id > $1
			ORDER BY officer_id ASC LIMIT $2`, lastID, batchSize)

		if err != nil {
			log.Println("[OfficerSync] Failed to query legacy DB:", err)
			return
		}

		rowCount := 0
		for rows.Next() {
			var o Officer
			if err := rows.Scan(&o.OfficerID, &o.OfficerName); err != nil {
				log.Println("[OfficerSync] Row scan failed:", err)
				continue
			}

			_, err = db.NewDB.Exec(ctx, `
				INSERT INTO officer (officer_id, officer_name)
				VALUES ($1, $2)
				ON CONFLICT (officer_id) DO UPDATE SET
					officer_name = EXCLUDED.officer_name
			`, o.OfficerID, o.OfficerName)

			if err != nil {
				log.Printf("[OfficerSync] Insert/Update into new DB failed for ID %d: %v\n", o.OfficerID, err)
			} else {
				rowCount++
				lastID = o.OfficerID
			}
		}

		rows.Close()
		if rowCount < batchSize {
			break
		}
	}

	log.Println("[OfficerSync] Officers sync (legacy -> new) completed.")
}
