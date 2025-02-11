package com.example.workflow.controller;

import com.example.workflow.model.StockPo;
import com.example.workflow.service.StockPoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-po")
public class StockPoController {

    @Autowired
    private StockPoService stockPoService;

    @GetMapping
    public ResponseEntity<List<StockPo>> getAllStockPos() {
        List<StockPo> stockPos = stockPoService.findAll();
        return new ResponseEntity<>(stockPos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPo> getStockPoById(@PathVariable Long id) {
        Optional<StockPo> stockPo = stockPoService.findById(id);
        return stockPo.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<StockPo> createStockPo(@RequestBody StockPo stockPo) {
        StockPo createdStockPo = stockPoService.save(stockPo);
        return new ResponseEntity<>(createdStockPo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockPo> updateStockPo(@PathVariable Long id, @RequestBody StockPo stockPoDetails) {
        Optional<StockPo> stockPo = stockPoService.findById(id);
        if (stockPo.isPresent()) {
            stockPoDetails.setId(id);
            StockPo updatedStockPo = stockPoService.save(stockPoDetails);
            return new ResponseEntity<>(updatedStockPo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockPo(@PathVariable Long id) {
        stockPoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
