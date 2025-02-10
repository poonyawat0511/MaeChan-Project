package com.example.workflow.service;

import com.example.workflow.model.StockBudget;
import com.example.workflow.repository.StockBudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockBudgetService {

    @Autowired
    private StockBudgetRepository stockBudgetRepository;

    public List<StockBudget> findAll() {
        return stockBudgetRepository.findAll();
    }

    public Optional<StockBudget> findById(Long id) {
        return stockBudgetRepository.findById(id);
    }

    public StockBudget save(StockBudget stockBudget) {
        return stockBudgetRepository.save(stockBudget);
    }

    public void deleteById(Long id) {
        stockBudgetRepository.deleteById(id);
    }
}
