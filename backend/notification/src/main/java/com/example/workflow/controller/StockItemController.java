package com.example.workflow.controller;

import com.example.workflow.model.StockItem;
import com.example.workflow.service.StockItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock-items")
public class StockItemController {

    @Autowired
    private StockItemService stockItemService;

    @GetMapping
    public ResponseEntity<List<StockItem>> getAllStockItems() {
        List<StockItem> stockItems = stockItemService.getAllStockItems();
        return new ResponseEntity<>(stockItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockItem> getStockItemById(@PathVariable Long id) {
        StockItem stockItem = stockItemService.getStockItemById(id);
        if (stockItem != null) {
            return new ResponseEntity<>(stockItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<StockItem> createStockItem(@RequestBody StockItem stockItem) {
        StockItem createdStockItem = stockItemService.createStockItem(stockItem);
        return new ResponseEntity<>(createdStockItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockItem> updateStockItem(@PathVariable Long id, @RequestBody StockItem stockItem) {
        StockItem updatedStockItem = stockItemService.updateStockItem(id, stockItem);
        if (updatedStockItem != null) {
            return new ResponseEntity<>(updatedStockItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockItem(@PathVariable Long id) {
        stockItemService.deleteStockItem(id);
        return ResponseEntity.noContent().build();
    }
}
