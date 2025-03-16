package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockPurchaseType;
import com.example.workflow.repository.StockPurchaseTypeRepository;

@Service
public class StockPurchaseTypeService {

    @Autowired
    private StockPurchaseTypeRepository stockPurchaseTypeRepository;

    public StockPurchaseType createStockPurchaseType(StockPurchaseType stockPurchaseType) {
        return stockPurchaseTypeRepository.save(stockPurchaseType);
    }

    public List<StockPurchaseType> findAllStockPurchaseTypes() {
        return stockPurchaseTypeRepository.findAll();
    }

    public Optional<StockPurchaseType> findStockPurchaseTypeById(Long id) {
        return stockPurchaseTypeRepository.findById(id);
    }

    public StockPurchaseType updateStockPurchaseType(StockPurchaseType stockPurchaseType) {
        return stockPurchaseTypeRepository.save(stockPurchaseType);
    }

    public void deleteStockPurchaseTypeById(Long id) {
        stockPurchaseTypeRepository.deleteById(id);
    }
}
