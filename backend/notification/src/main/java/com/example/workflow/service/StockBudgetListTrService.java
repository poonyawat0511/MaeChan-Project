package com.example.workflow.service;

import com.example.workflow.model.StockBudgetListTr;
import com.example.workflow.repository.StockBudgetListTrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockBudgetListTrService {

    @Autowired
    private StockBudgetListTrRepository repository;

    public List<StockBudgetListTr> findAll() {
        return repository.findAll();
    }

    public Optional<StockBudgetListTr> findById(Long id) {
        return repository.findById(id);
    }

    public StockBudgetListTr save(StockBudgetListTr stockBudgetListTr) {
        return repository.save(stockBudgetListTr);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
