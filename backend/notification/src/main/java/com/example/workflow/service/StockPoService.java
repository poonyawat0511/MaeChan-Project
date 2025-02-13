package com.example.workflow.service;

import com.example.workflow.model.StockPo;
import com.example.workflow.repository.StockPoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockPoService {

    @Autowired
    private StockPoRepository stockPoRepository;

    public List<StockPo> findAll() {
        return stockPoRepository.findAll();
    }

    public Optional<StockPo> findById(Long id) {
        return stockPoRepository.findById(id);
    }

    public StockPo save(StockPo stockPo) {
        return stockPoRepository.save(stockPo);
    }

    public void deleteById(Long id) {
        stockPoRepository.deleteById(id);
    }
}
