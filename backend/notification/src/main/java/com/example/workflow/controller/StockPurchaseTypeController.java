package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.workflow.model.StockPurchaseType;
import com.example.workflow.service.StockPurchaseTypeService;

@RestController
@RequestMapping("/stock-purchase-types")
public class StockPurchaseTypeController {

    @Autowired
    private StockPurchaseTypeService stockPurchaseTypeService;

    @GetMapping
    public ResponseEntity<List<StockPurchaseType>> getAllStockPurchaseTypes() {
        List<StockPurchaseType> stockPurchaseTypes = stockPurchaseTypeService.findAllStockPurchaseTypes();
        return new ResponseEntity<>(stockPurchaseTypes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPurchaseType> getStockPurchaseTypeById(@PathVariable Long id) {
        Optional<StockPurchaseType> stockPurchaseType = stockPurchaseTypeService.findStockPurchaseTypeById(id);
        return stockPurchaseType.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /* 
    @PostMapping
    public ResponseEntity<StockPurchaseType> createStockPurchaseType(@RequestBody StockPurchaseType stockPurchaseType) {
        StockPurchaseType createdStockPurchaseType = stockPurchaseTypeService.createStockPurchaseType(stockPurchaseType);
        return new ResponseEntity<>(createdStockPurchaseType, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockPurchaseType> updateStockPurchaseType(@PathVariable Long id, @RequestBody StockPurchaseType stockPurchaseType) {
        stockPurchaseType.setPurchaseType(id);
        StockPurchaseType updatedStockPurchaseType = stockPurchaseTypeService.updateStockPurchaseType(stockPurchaseType);
        return new ResponseEntity<>(updatedStockPurchaseType, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockPurchaseTypeById(@PathVariable Long id) {
        stockPurchaseTypeService.deleteStockPurchaseTypeById(id);
        return ResponseEntity.noContent().build();
    }
    */
}
