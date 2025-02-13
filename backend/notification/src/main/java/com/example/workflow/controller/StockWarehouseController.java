package com.example.workflow.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.workflow.model.StockWarehouse;
import com.example.workflow.service.StockWarehouseService;

@RestController
@RequestMapping("/stock-warehouse")
public class StockWarehouseController {

    @Autowired
    private StockWarehouseService stockWarehouseService;

    @PostMapping
    public ResponseEntity<StockWarehouse> createStockWarehouse(@RequestBody StockWarehouse stockWarehouse) {
        StockWarehouse createdStockWarehouse = stockWarehouseService.createStockWarehouse(stockWarehouse);
        return new ResponseEntity<>(createdStockWarehouse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockWarehouse>> getStockWarehouseList() {
        List<StockWarehouse> stockWarehouses = stockWarehouseService.findAllStockWarehouses();
        return new ResponseEntity<>(stockWarehouses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockWarehouse> getStockWarehouseById(@PathVariable Long id) {
        StockWarehouse stockWarehouse = stockWarehouseService.findStockWarehouseById(id);
        if (stockWarehouse != null) {
            return new ResponseEntity<>(stockWarehouse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockWarehouse> updateStockWarehouseById(@PathVariable Long id, @RequestBody StockWarehouse stockWarehouse) {
        stockWarehouse.setId(id);
        StockWarehouse updatedStockWarehouse = stockWarehouseService.updateStockWarehouse(stockWarehouse);
        if (updatedStockWarehouse != null) {
            return new ResponseEntity<>(updatedStockWarehouse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStockWarehouseById(@PathVariable Long id) {
        String result = stockWarehouseService.deleteStockWarehouseById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
