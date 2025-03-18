package com.example.workflow.controller;

import com.example.workflow.model.StockDepartment;
import com.example.workflow.service.StockDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-departments")
public class StockDepartmentController {

    @Autowired
    private StockDepartmentService stockDepartmentService;

    @GetMapping
    public List<StockDepartment> getAllStockDepartments() {
        return stockDepartmentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockDepartment> getStockDepartmentById(@PathVariable Long id) {
        Optional<StockDepartment> stockDepartment = stockDepartmentService.findById(id);
        return stockDepartment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /*

    @PostMapping
    public StockDepartment createStockDepartment(@RequestBody StockDepartment stockDepartment) {
        return stockDepartmentService.save(stockDepartment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockDepartment> updateStockDepartment(@PathVariable Long id, @RequestBody StockDepartment stockDepartment) {
        if (!stockDepartmentService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockDepartment.setDepartmentId(id);
        return ResponseEntity.ok(stockDepartmentService.save(stockDepartment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockDepartment(@PathVariable Long id) {
        if (!stockDepartmentService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockDepartmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    */
}
