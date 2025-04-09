package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockBudget;
import com.example.workflow.repository.StockBudgetRepository;

@Service
public class StockBudgetService {

    @Autowired
    private StockBudgetRepository stockBudgetRepository;

    public Page<StockBudget> findAll(Pageable pageable) {
        return stockBudgetRepository.findAll(pageable);
    }

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
