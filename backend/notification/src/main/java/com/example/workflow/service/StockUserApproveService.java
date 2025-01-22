package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.StockUserApprove;
import com.example.workflow.repository.StockUserApproveRepository;

@Service
public class StockUserApproveService {

    @Autowired
    StockUserApproveRepository stockUserApproveRepository;

    public StockUserApprove createStockUserApprove(StockUserApprove stockUserApprove) {
        return stockUserApproveRepository.save(stockUserApprove);
    }

    public List<StockUserApprove> findAllStockUserApproves() {
        return stockUserApproveRepository.findAll();
    }

    public StockUserApprove finStockUserApproveById(Long approverId) {
        Optional<StockUserApprove> stockUserApprove = stockUserApproveRepository.findById(approverId);
        return stockUserApprove.orElse(null);
    }

    public StockUserApprove updateStockUserApprove(StockUserApprove updatedStockUserApprove) {
        return stockUserApproveRepository.findById(updatedStockUserApprove.getStockUserApproveId())
                .map(existingStockUserApprove -> {
                    existingStockUserApprove.setStockUserApproveName(updatedStockUserApprove.getStockUserApproveName());
                    return stockUserApproveRepository.save(existingStockUserApprove);
                })
                .orElseThrow(() -> new RuntimeException("StockUserApprove not found with id: " + updatedStockUserApprove.getStockUserApproveId()));
    }

    public String deleteStockUserApproveById(Long approverId) {
        stockUserApproveRepository.deleteById(approverId);
        return "StockUserApprove id:" + approverId + " has been deleted";
    }
}
