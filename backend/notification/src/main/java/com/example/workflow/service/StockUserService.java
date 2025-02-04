package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockUser;
import com.example.workflow.repository.StockUserRepository;

@Service
public class StockUserService {

    @Autowired
    private StockUserRepository stockUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
                    existingStockUser.setEmail(updatedStockUser.getEmail());
                    existingStockUser.setFirstName(updatedStockUser.getLastName());
                    existingStockUser.setLastName(updatedStockUser.getLastName());
                    existingStockUser.setLineId(updatedStockUser.getLineId());
                    existingStockUser.setRole(updatedStockUser.getRole());
                    existingStockUser.setSignaturePath(updatedStockUser.getSignaturePath());
                    existingStockUser.setUserHospitalId(updatedStockUser.getUserHospitalId());

                    if (updatedStockUser.getPassword() != null && !updatedStockUser.getPassword().isEmpty()) {
                        String hashedPassword = passwordEncoder.encode(updatedStockUser.getPassword());
                        existingStockUser.setPassword(hashedPassword);
                    }

                    return stockUserRepository.save(existingStockUser);
                })
                .orElseThrow(() -> new RuntimeException("StockUser not found with id: " + updatedStockUser.getStockUserId()));
    }

    public String deleteStockUserById(Long stockUserId) {
        stockUserRepository.deleteById(stockUserId);
        return "StockUser id:" + stockUserId + " has been deleted";
    }
}
