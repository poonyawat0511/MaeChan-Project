package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.StockPoDetail;
import com.example.workflow.service.StockPoDetailService;

@RestController
@RequestMapping("/stock-po-details")
public class StockPoDetailController {

    @Autowired
    private StockPoDetailService stockPoDetailService;

    @GetMapping
    public ResponseEntity<List<StockPoDetail>> getAllStockPoDetails() {
        return new ResponseEntity<>(stockPoDetailService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPoDetail> getStockPoDetailById(@PathVariable Long id) {
        Optional<StockPoDetail> stockPoDetail = stockPoDetailService.findById(id);
        return stockPoDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockPoDetail> createStockPoDetail(@RequestBody StockPoDetail stockPoDetail) {
        StockPoDetail createdStockPoDetail = stockPoDetailService.save(stockPoDetail);
        return new ResponseEntity<>(createdStockPoDetail, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockPoDetail> updateStockPoDetail(@PathVariable Long id, @RequestBody StockPoDetail stockPoDetail) {
        if (!stockPoDetailService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockPoDetail.setId(id);
        StockPoDetail updatedStockPoDetail = stockPoDetailService.save(stockPoDetail);
        return new ResponseEntity<>(updatedStockPoDetail, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockPoDetail(@PathVariable Long id) {
        if (!stockPoDetailService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockPoDetailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
