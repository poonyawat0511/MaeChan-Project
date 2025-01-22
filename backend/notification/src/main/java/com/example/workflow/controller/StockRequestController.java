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

import com.example.workflow.model.StockRequest;
import com.example.workflow.service.StockRequestService;


@RestController
@RequestMapping("/stock-requests")
public class StockRequestController {

    @Autowired
    StockRequestService stockRequestService;

    @PostMapping
    public ResponseEntity<StockRequest> createStockRequest(@RequestBody StockRequest stockRequest) {
        StockRequest createStockRequest = stockRequestService.createStockRequest(stockRequest);
        return new ResponseEntity<>(createStockRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockRequest>> getStockRequestList() {
        List<StockRequest> stockRequest = stockRequestService.findAllStockRequest();
        return new ResponseEntity<>(stockRequest, HttpStatus.OK);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<StockRequest> getStockRequestByStockRequestId(@PathVariable Long requestId) {
        StockRequest stockRequest = stockRequestService.findStockRequestById(requestId);
        if (stockRequest != null) {
            return new ResponseEntity<>(stockRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{requestId}")
    public ResponseEntity<StockRequest> updateStockRequestById(@PathVariable Long requestId, @RequestBody StockRequest stockRequest) {
        stockRequest.setId(requestId);
        StockRequest updatedStockRequest = stockRequestService.updateStockRequest(stockRequest);
        if (updatedStockRequest != null) {
            return new ResponseEntity<>(updatedStockRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<String> deletedStockRequestById(@PathVariable Long requestId) {
        String result = stockRequestService.deleteStockRequestById(requestId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<StockRequest> getstockRequestByCamundaTaskId(@PathVariable String taskId) {
        StockRequest stockRequest = stockRequestService.findStockRequestByCamundaTaskId(taskId);
        if (stockRequest != null) {
            return new ResponseEntity<>(stockRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
