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

import com.example.workflow.model.StockUser;
import com.example.workflow.service.StockUserService;


@RestController
@RequestMapping("/admin/stock-user")
public class StockUserController {
    @Autowired
    private StockUserService stockUserService;

    @PostMapping
    public ResponseEntity<StockUser> createStockRequest(@RequestBody StockUser stockUser) {
        StockUser createStockUser = stockUserService.creatStockUser(stockUser);
        return new ResponseEntity<>(createStockUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockUser>> getStockUserList() {
        List<StockUser> stockUser = stockUserService.findAllStockUser();
        return new ResponseEntity<>(stockUser, HttpStatus.OK);
    }

    @GetMapping("/{stockUserId}")
    public ResponseEntity<StockUser> getStockUserByStockUserId(@PathVariable Long stockUserId) {
        StockUser stockUser = stockUserService.findStockUserById(stockUserId);
        if (stockUser != null) {
            return new ResponseEntity<>(stockUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{stockUserId}")
    public ResponseEntity<StockUser> updateStockUserById(@PathVariable Long stockUserId, @RequestBody StockUser stockUser) {
        stockUser.setStockUserId(stockUserId);
        StockUser updatedStockUser = stockUserService.updateStockUser(stockUser);
        if (updatedStockUser != null) {
            return new ResponseEntity<>(updatedStockUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{stockUserId}")
    public ResponseEntity<String> deletedStockUserById(@PathVariable Long stockUserId) {
        String result = stockUserService.deleteStockUserById(stockUserId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
