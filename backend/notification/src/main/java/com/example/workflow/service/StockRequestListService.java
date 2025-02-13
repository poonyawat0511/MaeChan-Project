package com.example.workflow.service;

import com.example.workflow.model.StockRequestList;
import com.example.workflow.repository.StockRequestListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockRequestListService {

    @Autowired
    private StockRequestListRepository stockRequestListRepository;

    public List<StockRequestList> findAll() {
        return stockRequestListRepository.findAll();
    }

    public Optional<StockRequestList> findById(Long id) {
        return stockRequestListRepository.findById(id);
    }

    public StockRequestList save(StockRequestList stockRequestList) {
        return stockRequestListRepository.save(stockRequestList);
    }

    public void deleteById(Long id) {
        stockRequestListRepository.deleteById(id);
    }
}
