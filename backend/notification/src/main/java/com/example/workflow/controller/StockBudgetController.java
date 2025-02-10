package com.example.workflow.controller;

import com.example.workflow.dto.StockBudgetDto;
import com.example.workflow.mapper.StockBudgetMapper;
import com.example.workflow.model.StockBudget;
import com.example.workflow.service.StockBudgetService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<StockBudgetDto> getAllStockBudgets() {
        return stockBudgetService.findAll().stream()
                .map(stockBudgetMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public StockBudgetDto getStockBudgetById(@PathVariable Long id) {
        return stockBudgetService.findById(id)
                .map(stockBudgetMapper::toDto)
                .orElse(null);
    }

    @PostMapping
    public StockBudgetDto createStockBudget(@RequestBody StockBudgetDto stockBudgetDto) {
        StockBudget stockBudget = stockBudgetMapper.toEntity(stockBudgetDto);
        return stockBudgetMapper.toDto(stockBudgetService.save(stockBudget));
    }

    @PutMapping("/{id}")
    public StockBudgetDto updateStockBudget(@PathVariable Long id, @RequestBody StockBudgetDto stockBudgetDto) {
        StockBudget stockBudget = stockBudgetMapper.toEntity(stockBudgetDto);
        stockBudget.setId(id);
        return stockBudgetMapper.toDto(stockBudgetService.save(stockBudget));
    }

    @DeleteMapping("/{id}")
    public void deleteStockBudget(@PathVariable Long id) {
        stockBudgetService.deleteById(id);
    }
}
