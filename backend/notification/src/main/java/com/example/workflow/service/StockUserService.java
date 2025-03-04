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
    StockUserRepository stockUserRepository;

    public StockUser createStockUser(StockUser stockUser) {
        return stockUserRepository.save(stockUser);
    }

    public List<StockUser> findAllStockUser() {
        return stockUserRepository.findAll();
    }

    public StockUser findStockUserById(Long id) {
        Optional<StockUser> stockUser = stockUserRepository.findById(id);
        return stockUser.orElse(null);
    }

    public StockUser updateStockUser(StockUser updatedStockUser) {
        return stockUserRepository.findById(updatedStockUser.getId())
                .map(existingStockUser -> {
                    existingStockUser.setId(updatedStockUser.getId());
                    existingStockUser.setFirstName(updatedStockUser.getFirstName());
                    existingStockUser.setLastName(updatedStockUser.getLastName());
                    return stockUserRepository.save(existingStockUser);
                })
                .orElseThrow(() -> new RuntimeException("StockUser not found with id: " + updatedStockUser.getId()));
    }

    public String deleteStockUserById(Long id) {
        stockUserRepository.deleteById(id);
        return "StockUser id:" + id + " has been deleted";
    }
}
