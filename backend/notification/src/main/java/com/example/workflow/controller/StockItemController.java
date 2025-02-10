package com.example.workflow.controller;

import com.example.workflow.model.StockItem;
import com.example.workflow.service.StockItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock-items")
public class StockItemController {

    @Autowired
    private StockItemService stockItemService;

    @GetMapping
    public List<StockItem> getAllStockItems() {
        return stockItemService.getAllStockItems();
    }

    @GetMapping("/{id}")
    public StockItem getStockItemById(@PathVariable Long id) {
        return stockItemService.getStockItemById(id);
    }

    @PostMapping
    public StockItem createStockItem(@RequestBody StockItem stockItem) {
        return stockItemService.createStockItem(stockItem);
    }

    @PutMapping("/{id}")
    public StockItem updateStockItem(@PathVariable Long id, @RequestBody StockItem stockItem) {
        return stockItemService.updateStockItem(id, stockItem);
    }

    @DeleteMapping("/{id}")
    public void deleteStockItem(@PathVariable Long id) {
        stockItemService.deleteStockItem(id);
    }
}
