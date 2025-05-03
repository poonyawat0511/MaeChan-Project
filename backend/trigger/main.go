package main

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/db"
	"github.com/poonyawat0511/MaeChan-Project/backend/trigger/sync"
)

func main() {
	db.ConnectDatabases()
	app := fiber.New()

	app.Post("/sync-now", func(c *fiber.Ctx) error {
		go sync.SyncStockRequests()
		return c.SendString("Triggered manual sync!")
	})

	app.Post("/sync-back-legacy", func(c *fiber.Ctx) error {
		go sync.SyncBackFromLegacy()
		return c.SendString("Legacy ➜ New DB sync started!")
	})

	app.Post("/sync-all", func(c *fiber.Ctx) error {
		go sync.SyncAll()
		return c.SendString("Full sync started!")
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	// 🕒 Automatic sync every 5 minutes
	go func() {
		ticker := time.NewTicker(5 * time.Minute)
		defer ticker.Stop()

		for range ticker.C {
			log.Println("[AutoSync] Starting scheduled sync...")
			sync.SyncAll()
		}
	}()

	log.Fatal(app.Listen(":8082"))
}
