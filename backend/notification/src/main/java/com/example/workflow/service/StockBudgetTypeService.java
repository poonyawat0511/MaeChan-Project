package com.example.workflow.service;

import com.example.workflow.model.StockBudgetType;
import com.example.workflow.repository.StockBudgetTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockBudgetTypeService {

    @Autowired
    private StockBudgetTypeRepository stockBudgetTypeRepository;

    public List<StockBudgetType> findAll() {
        return stockBudgetTypeRepository.findAll();
    }

    public Optional<StockBudgetType> findById(Long id) {
        return stockBudgetTypeRepository.findById(id);
    }

    public StockBudgetType save(StockBudgetType stockBudgetType) {
        return stockBudgetTypeRepository.save(stockBudgetType);
    }

    public void deleteById(Long id) {
        stockBudgetTypeRepository.deleteById(id);
    }
}
