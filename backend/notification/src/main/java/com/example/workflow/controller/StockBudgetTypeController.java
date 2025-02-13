package com.example.workflow.controller;

import com.example.workflow.model.StockBudgetType;
import com.example.workflow.service.StockBudgetTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-budget-types")
public class StockBudgetTypeController {

    @Autowired
    private StockBudgetTypeService stockBudgetTypeService;

    @GetMapping
    public List<StockBudgetType> getAllStockBudgetTypes() {
        return stockBudgetTypeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockBudgetType> getStockBudgetTypeById(@PathVariable Long id) {
        Optional<StockBudgetType> stockBudgetType = stockBudgetTypeService.findById(id);
        return stockBudgetType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockBudgetType> createStockBudgetType(@RequestBody StockBudgetType stockBudgetType) {
        StockBudgetType createdStockBudgetType = stockBudgetTypeService.save(stockBudgetType);
        return new ResponseEntity<>(createdStockBudgetType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockBudgetType> updateStockBudgetType(@PathVariable Long id, @RequestBody StockBudgetType stockBudgetTypeDetails) {
        Optional<StockBudgetType> stockBudgetType = stockBudgetTypeService.findById(id);
        if (stockBudgetType.isPresent()) {
            StockBudgetType updatedStockBudgetType = stockBudgetType.get();
            updatedStockBudgetType.setStockBudgetTypeName(stockBudgetTypeDetails.getStockBudgetTypeName());
            updatedStockBudgetType.setAccPoBudgetTypeId(stockBudgetTypeDetails.getAccPoBudgetTypeId());
            stockBudgetTypeService.save(updatedStockBudgetType);
            return new ResponseEntity<>(updatedStockBudgetType, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockBudgetType(@PathVariable Long id) {
        if (stockBudgetTypeService.findById(id).isPresent()) {
            stockBudgetTypeService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
