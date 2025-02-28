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
@RequestMapping("/stock-user")
public class StockUserController {

    @Autowired
    private StockUserService stockUserService;

    @PostMapping
    public ResponseEntity<StockUser> createStockUser(@RequestBody StockUser stockUser) {
        StockUser createStockUser = stockUserService.createStockUser(stockUser);
        return new ResponseEntity<>(createStockUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockUser>> getStockUserList() {
        List<StockUser> stockUser = stockUserService.findAllStockUser();
        return new ResponseEntity<>(stockUser, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockUser> getStockUserById(@PathVariable Long id) {
        StockUser stockUser = stockUserService.findStockUserById(id);
        if (stockUser != null) {
            return new ResponseEntity<>(stockUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockUser> updateStockUserById(@PathVariable Long id, @RequestBody StockUser stockUser) {
        stockUser.setId(id);
        StockUser updatedStockUser = stockUserService.updateStockUser(stockUser);
        if (updatedStockUser != null) {
            return new ResponseEntity<>(updatedStockUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletedStockUserById(@PathVariable Long id) {
        String result = stockUserService.deleteStockUserById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
