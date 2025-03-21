package com.example.workflow.service;

import com.example.workflow.model.StockBudgetList;
import com.example.workflow.repository.StockBudgetListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockBudgetListService {

    @Autowired
    private StockBudgetListRepository stockBudgetListRepository;

    public List<StockBudgetList> findAll() {
        return stockBudgetListRepository.findAll();
    }

    public Optional<StockBudgetList> findById(Long id) {
        return stockBudgetListRepository.findById(id);
    }

    public StockBudgetList save(StockBudgetList stockBudgetList) {
        return stockBudgetListRepository.save(stockBudgetList);
    }

    public void deleteById(Long id) {
        stockBudgetListRepository.deleteById(id);
    }
}
