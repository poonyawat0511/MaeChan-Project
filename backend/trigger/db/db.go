package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var NewDB *pgxpool.Pool
var LegacyDB *pgxpool.Pool

func ConnectDatabases() {
	var err error
	// real database
	// NewDB, err = pgxpool.New(context.Background(), "postgres://postgres:Mch%4011192@192.168.2.19:5432/Inventory_11192")
	// test from localhost
	NewDB, err = pgxpool.New(context.Background(), "postgres://postgres:user%401234@localhost:5432/InventoryManagement")
	if err != nil {
		// log.Fatal("Failed to connect to NEW DB (Inventory_11192) :", err)
		log.Fatal("Failed to connect to NEW DB (InventoryManagement) :", err)
	}

	LegacyDB, err = pgxpool.New(context.Background(), "postgres://postgres:user%401234@localhost:5432/postgres")
	if err != nil {
		log.Fatal("Failed to connect to LEGACY DB (postgres):", err)
	}
}
