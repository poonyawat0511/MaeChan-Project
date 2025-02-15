package com.example.workflow.controller;

import com.example.workflow.dto.StockBudgetDto;
import com.example.workflow.mapper.StockBudgetMapper;
import com.example.workflow.model.StockBudget;
import com.example.workflow.service.StockBudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stock-budgets")
public class StockBudgetController {

    @Autowired
    private StockBudgetService stockBudgetService;

    @Autowired
    private StockBudgetMapper stockBudgetMapper;

    @GetMapping
    public ResponseEntity<List<StockBudgetDto>> getAllStockBudgets() {
        List<StockBudgetDto> stockBudgets = stockBudgetService.findAll().stream()
                .map(stockBudgetMapper::toDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(stockBudgets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockBudgetDto> getStockBudgetById(@PathVariable Long id) {
        return stockBudgetService.findById(id)
                .map(stockBudgetMapper::toDto)
                .map(stockBudgetDto -> new ResponseEntity<>(stockBudgetDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<StockBudgetDto> createStockBudget(@RequestBody StockBudgetDto stockBudgetDto) {
        StockBudget stockBudget = stockBudgetMapper.toEntity(stockBudgetDto);
        StockBudget createdStockBudget = stockBudgetService.save(stockBudget);
        return new ResponseEntity<>(stockBudgetMapper.toDto(createdStockBudget), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockBudgetDto> updateStockBudget(@PathVariable Long id, @RequestBody StockBudgetDto stockBudgetDto) {
        StockBudget stockBudget = stockBudgetMapper.toEntity(stockBudgetDto);
        stockBudget.setId(id);
        StockBudget updatedStockBudget = stockBudgetService.save(stockBudget);
        return new ResponseEntity<>(stockBudgetMapper.toDto(updatedStockBudget), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockBudget(@PathVariable Long id) {
        stockBudgetService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
