package com.example.workflow.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.StockUserApprove;
import com.example.workflow.service.StockUserApproveService;

@RestController
@RequestMapping("/stock-user-approve")
public class StockUserApproveController {

    @Autowired
    private StockUserApproveService stockUserApproveService;

    @PostMapping
    public ResponseEntity<StockUserApprove> createStockRequest(@RequestBody StockUserApprove stockUserApprove) {
        StockUserApprove createStockUserApprove = stockUserApproveService.createStockUserApprove(stockUserApprove);
        return new ResponseEntity<>(createStockUserApprove, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockUserApprove>> getStockUserApproveList() {
        List<StockUserApprove> stockUserApproves = stockUserApproveService.findAllStockUserApproves();
        return new ResponseEntity<>(stockUserApproves, HttpStatus.OK);
    }

    @GetMapping("/{approverId}")
    public ResponseEntity<StockUserApprove> getStockUserApproveByStockUserApproveId(@PathVariable Long approverId) {
        StockUserApprove stockUserApproves = stockUserApproveService.finStockUserApproveById(approverId);
        if (stockUserApproves != null) {
            return new ResponseEntity<>(stockUserApproves, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{approverId}")
    public ResponseEntity<StockUserApprove> updateStockUserApproveById(@PathVariable Long approverId, @RequestBody StockUserApprove stockUserApprove) {
        stockUserApprove.setStockUserApproveId(approverId);
        StockUserApprove updatedStockUserApprove = stockUserApproveService.updateStockUserApprove(stockUserApprove);
        if (updatedStockUserApprove != null) {
            return new ResponseEntity<>(updatedStockUserApprove, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{approverId}")
    public ResponseEntity<String> deletedStockUserApproveById(@PathVariable Long approverId) {
        String result = stockUserApproveService.deleteStockUserApproveById(approverId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
