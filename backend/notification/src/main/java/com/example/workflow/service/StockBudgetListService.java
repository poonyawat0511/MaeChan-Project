package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockBudgetList;
import com.example.workflow.repository.StockBudgetListRepository;

@Service
public class StockBudgetListService {

    @Autowired
    private StockBudgetListRepository stockBudgetListRepository;

    public Page<StockBudgetList> findAll(Pageable pageable) {
        return stockBudgetListRepository.findAll(pageable);
    }

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
