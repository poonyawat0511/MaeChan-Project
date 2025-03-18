package com.example.workflow.service;

import com.example.workflow.model.StockDepartment;
import com.example.workflow.repository.StockDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockDepartmentService {

    @Autowired
    private StockDepartmentRepository stockDepartmentRepository;

    public List<StockDepartment> findAll() {
        return stockDepartmentRepository.findAll();
    }

    public Optional<StockDepartment> findById(Long id) {
        return stockDepartmentRepository.findById(id);
    }

    /* 

    public StockDepartment save(StockDepartment stockDepartment) {
        return stockDepartmentRepository.save(stockDepartment);
    }

    public void deleteById(Long id) {
        stockDepartmentRepository.deleteById(id);
    }
        
    */
}
