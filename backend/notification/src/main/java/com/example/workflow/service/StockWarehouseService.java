package com.example.workflow.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.workflow.model.StockWarehouse;
import com.example.workflow.repository.StockWarehouseRepository;

@Service
public class StockWarehouseService {

    @Autowired
    private StockWarehouseRepository stockWarehouseRepository;

    public StockWarehouse createStockWarehouse(StockWarehouse stockWarehouse) {
        return stockWarehouseRepository.save(stockWarehouse);
    }

    public List<StockWarehouse> findAllStockWarehouses() {
        return stockWarehouseRepository.findAll();
    }

    public StockWarehouse findStockWarehouseById(Long id) {
        return stockWarehouseRepository.findById(id).orElse(null);
    }

    public StockWarehouse updateStockWarehouse(StockWarehouse stockWarehouse) {
        return stockWarehouseRepository.save(stockWarehouse);
    }

    public String deleteStockWarehouseById(Long id) {
        stockWarehouseRepository.deleteById(id);
        return "StockWarehouse deleted successfully";
    }
}
