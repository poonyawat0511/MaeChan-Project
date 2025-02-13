package com.example.workflow.service;

import com.example.workflow.model.StockItem;
import com.example.workflow.repository.StockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockItemService {

    @Autowired
    private StockItemRepository stockItemRepository;

    public List<StockItem> getAllStockItems() {
        return stockItemRepository.findAll();
    }

    public StockItem getStockItemById(Long id) {
        return stockItemRepository.findById(id).orElse(null);
    }

    public StockItem createStockItem(StockItem stockItem) {
        return stockItemRepository.save(stockItem);
    }

    public StockItem updateStockItem(Long id, StockItem stockItem) {
        if (stockItemRepository.existsById(id)) {
            stockItem.setId(id);
            return stockItemRepository.save(stockItem);
        }
        return null;
    }

    public void deleteStockItem(Long id) {
        stockItemRepository.deleteById(id);
    }
}
