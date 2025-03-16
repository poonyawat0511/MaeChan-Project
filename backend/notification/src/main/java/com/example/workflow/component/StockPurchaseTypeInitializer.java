package com.example.workflow.component;

import org.springframework.stereotype.Component;

import com.example.workflow.repository.StockPurchaseTypeRepository;
import com.example.workflow.model.StockPurchaseType;

import jakarta.annotation.PostConstruct;

@Component
public class StockPurchaseTypeInitializer {
    private final StockPurchaseTypeRepository stockPurchaseTypeRepository;

    public StockPurchaseTypeInitializer(StockPurchaseTypeRepository stockPurchaseTypeRepository) {
        this.stockPurchaseTypeRepository = stockPurchaseTypeRepository;
    }

    @PostConstruct
    public void initializeStockPurchaseTypes() {
        if (stockPurchaseTypeRepository.count() == 0) {
            stockPurchaseTypeRepository.save(new StockPurchaseType(6, "เฉพาะเจาะจง"));
            stockPurchaseTypeRepository.save(new StockPurchaseType(7, "คัดเลือก"));
            stockPurchaseTypeRepository.save(new StockPurchaseType(2, "สอบราคา"));
            stockPurchaseTypeRepository.save(new StockPurchaseType(3, "ประกวดราคาอิเล็กทรอนิกส์ e-bidding"));
            stockPurchaseTypeRepository.save(new StockPurchaseType(8, "ตลาดอิเล็กทรอนิกส์ e-market"));
        }
    }
}
