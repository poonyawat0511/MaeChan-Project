package com.example.workflow.controller;

import com.example.workflow.model.StockPoDetail;
import com.example.workflow.service.StockPoDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stockPoDetails")
public class StockPoDetailController {

    @Autowired
    private StockPoDetailService stockPoDetailService;

    @GetMapping
    public List<StockPoDetail> getAllStockPoDetails() {
        return stockPoDetailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPoDetail> getStockPoDetailById(@PathVariable Long id) {
        Optional<StockPoDetail> stockPoDetail = stockPoDetailService.findById(id);
        return stockPoDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public StockPoDetail createStockPoDetail(@RequestBody StockPoDetail stockPoDetail) {
        return stockPoDetailService.save(stockPoDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockPoDetail> updateStockPoDetail(@PathVariable Long id, @RequestBody StockPoDetail stockPoDetail) {
        if (!stockPoDetailService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockPoDetail.setId(id);
        return ResponseEntity.ok(stockPoDetailService.save(stockPoDetail));
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
