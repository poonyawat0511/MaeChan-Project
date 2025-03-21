package com.example.workflow.controller;

import com.example.workflow.model.StockBudgetListTr;
import com.example.workflow.service.StockBudgetListTrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-budget-list-tr")
public class StockBudgetListTrController {

    @Autowired
    private StockBudgetListTrService service;

    @PostMapping
    public ResponseEntity<StockBudgetListTr> createStockBudgetListTr(@RequestBody StockBudgetListTr stockBudgetListTr) {
        StockBudgetListTr createdStockBudgetListTr = service.save(stockBudgetListTr);
        return new ResponseEntity<>(createdStockBudgetListTr, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockBudgetListTr>> getAllStockBudgetListTrs() {
        List<StockBudgetListTr> stockBudgetListTrs = service.findAll();
        return new ResponseEntity<>(stockBudgetListTrs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockBudgetListTr> getStockBudgetListTrById(@PathVariable Long id) {
        Optional<StockBudgetListTr> stockBudgetListTr = service.findById(id);
        return stockBudgetListTr.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockBudgetListTr> updateStockBudgetListTr(@PathVariable Long id, @RequestBody StockBudgetListTr stockBudgetListTrDetails) {
        Optional<StockBudgetListTr> stockBudgetListTr = service.findById(id);
        if (stockBudgetListTr.isPresent()) {
            StockBudgetListTr updatedStockBudgetListTr = stockBudgetListTr.get();
            updatedStockBudgetListTr.setStockBudgetListTrId(id);
            // ...existing code...
            return new ResponseEntity<>(service.save(updatedStockBudgetListTr), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStockBudgetListTr(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.deleteById(id);
        return new ResponseEntity<>("StockBudgetListTr deleted successfully", HttpStatus.OK);
    }
}
