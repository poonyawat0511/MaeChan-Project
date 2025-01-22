package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockUser;
import com.example.workflow.repository.StockUserRepository;

@Service
public class StockUserService {

    @Autowired
    private StockUserRepository stockUserRepository;

    public StockUser creatStockUser(StockUser stockUser) {
        return stockUserRepository.save(stockUser);
    }

    public List<StockUser> findAllStockUser() {
        return stockUserRepository.findAll();
    }

    public StockUser findStockUserById(Long stockUserId) {
        Optional<StockUser> stockUser = stockUserRepository.findById(stockUserId);
        return stockUser.orElse(null);
    }

    public StockUser updateStockUser(StockUser updatedStockUser) {
        return stockUserRepository.findById(updatedStockUser.getStockUserId())
                .map(existingStockUser -> {
                    existingStockUser.setStockUserName(updatedStockUser.getStockUserName());
                    return stockUserRepository.save(existingStockUser);
                })
                .orElseThrow(() -> new RuntimeException("StockUser not found with id: " + updatedStockUser.getStockUserId()));
    }

    public String deleteStockUserById(Long stockUserId) {
        stockUserRepository.deleteById(stockUserId);
        return "StockUser id:" + stockUserId + " has been deleted";
    }
}
