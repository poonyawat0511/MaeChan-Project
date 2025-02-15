package com.example.workflow.controller;

import com.example.workflow.model.StockPo;
import com.example.workflow.model.StockRequestList;
import com.example.workflow.service.StockRequestListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-request-list")
public class StockRequestListController {

    @Autowired
    private StockRequestListService stockRequestListService;

    @GetMapping
    public ResponseEntity<List<StockRequestList>> getAllStockRequestLists() {
        return new ResponseEntity<>(stockRequestListService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockRequestList> getStockRequestListById(@PathVariable Long id) {
        Optional<StockRequestList> stockRequestList = stockRequestListService.findById(id);
        return stockRequestList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockRequestList> createStockRequestList(@RequestBody StockRequestList stockRequestList) {
        StockRequestList createdStockRequestList = stockRequestListService.save(stockRequestList);
        return new ResponseEntity<>(createdStockRequestList, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockRequestList> updateStockRequestList(@PathVariable Long id, @RequestBody StockRequestList stockRequestListDetails) {
        Optional<StockRequestList> stockRequestListOptional = stockRequestListService.findById(id);
        if (stockRequestListOptional.isPresent()) {
            StockRequestList updatedStockRequestList = stockRequestListService.save(stockRequestListDetails);
            return new ResponseEntity<>(updatedStockRequestList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockRequestList(@PathVariable Long id) {
        stockRequestListService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
