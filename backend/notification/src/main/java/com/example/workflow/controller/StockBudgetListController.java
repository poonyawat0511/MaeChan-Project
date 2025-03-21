package com.example.workflow.controller;

import com.example.workflow.model.StockBudgetList;
import com.example.workflow.service.StockBudgetListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-budget-list")
public class StockBudgetListController {

    @Autowired
    private StockBudgetListService stockBudgetListService;

    @PostMapping
    public ResponseEntity<StockBudgetList> createStockBudgetList(@RequestBody StockBudgetList stockBudgetList) {
        StockBudgetList createdStockBudgetList = stockBudgetListService.save(stockBudgetList);
        return new ResponseEntity<>(createdStockBudgetList, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockBudgetList>> getAllStockBudgetLists() {
        List<StockBudgetList> stockBudgetLists = stockBudgetListService.findAll();
        return new ResponseEntity<>(stockBudgetLists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockBudgetList> getStockBudgetListById(@PathVariable Long id) {
        Optional<StockBudgetList> stockBudgetList = stockBudgetListService.findById(id);
        return stockBudgetList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockBudgetList> updateStockBudgetList(@PathVariable Long id, @RequestBody StockBudgetList stockBudgetListDetails) {
        Optional<StockBudgetList> stockBudgetList = stockBudgetListService.findById(id);
        if (stockBudgetList.isPresent()) {
            StockBudgetList updatedStockBudgetList = stockBudgetList.get();
            updatedStockBudgetList.setStockBudgetYear(stockBudgetListDetails.getStockBudgetYear());
            updatedStockBudgetList.setStockBudgetPrice(stockBudgetListDetails.getStockBudgetPrice());
            updatedStockBudgetList.setStockBudgetRemain(stockBudgetListDetails.getStockBudgetRemain());
            updatedStockBudgetList.setStockBudgetUse(stockBudgetListDetails.getStockBudgetUse());
            updatedStockBudgetList.setStockBudgetRcvPrice(stockBudgetListDetails.getStockBudgetRcvPrice());
            return new ResponseEntity<>(stockBudgetListService.save(updatedStockBudgetList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStockBudgetList(@PathVariable Long id) {
        stockBudgetListService.deleteById(id);
        return new ResponseEntity<>("StockBudgetList deleted successfully", HttpStatus.OK);
    }
}