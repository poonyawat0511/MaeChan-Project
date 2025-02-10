package com.example.workflow.service;

import com.example.workflow.model.StockPoDetail;
import com.example.workflow.repository.StockPoDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockPoDetailService {

    @Autowired
    private StockPoDetailRepository stockPoDetailRepository;

    public List<StockPoDetail> findAll() {
        return stockPoDetailRepository.findAll();
    }

    public Optional<StockPoDetail> findById(Long id) {
        return stockPoDetailRepository.findById(id);
    }

    public StockPoDetail save(StockPoDetail stockPoDetail) {
        return stockPoDetailRepository.save(stockPoDetail);
    }

    public void deleteById(Long id) {
        stockPoDetailRepository.deleteById(id);
    }
}
