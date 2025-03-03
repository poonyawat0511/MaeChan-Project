package com.example.workflow.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import com.example.workflow.dto.StockRequestDto;
import com.example.workflow.mapper.StockRequestMapper;
import com.example.workflow.model.StockRequest;
import com.example.workflow.service.StockRequestService;

@RestController
@RequestMapping("/stock-requests")
public class StockRequestController {

    @Autowired
    StockRequestService stockRequestService;

    @PostMapping
    public ResponseEntity<StockRequestDto> createStockRequest(@RequestBody StockRequestDto stockRequestDto) {
        StockRequest stockRequest = StockRequestMapper.mapToStockRequest(stockRequestDto);
        StockRequest createdStockRequest = stockRequestService.createStockRequest(stockRequest);
        StockRequestDto createdStockRequestDto = StockRequestMapper.mapToStockRequestDto(createdStockRequest);
        return new ResponseEntity<>(createdStockRequestDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockRequestDto>> getStockRequestList() {
        List<StockRequest> stockRequests = stockRequestService.findAllStockRequest();
        List<StockRequestDto> stockRequestDtos = stockRequests.stream()
                .map(StockRequestMapper::mapToStockRequestDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(stockRequestDtos, HttpStatus.OK);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<StockRequestDto> getStockRequestByStockRequestId(@PathVariable Long requestId) {
        StockRequest stockRequest = stockRequestService.findStockRequestById(requestId);
        if (stockRequest != null) {
            StockRequestDto stockRequestDto = StockRequestMapper.mapToStockRequestDto(stockRequest);
            return new ResponseEntity<>(stockRequestDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{requestId}")
    public ResponseEntity<StockRequestDto> updateStockRequestById(@PathVariable Long requestId, @RequestBody StockRequestDto stockRequestDto) {
        StockRequest stockRequest = StockRequestMapper.mapToStockRequest(stockRequestDto);
        stockRequest.setRequestId(requestId);
        StockRequest updatedStockRequest = stockRequestService.updateStockRequest(stockRequest);
        if (updatedStockRequest != null) {
            StockRequestDto updatedStockRequestDto = StockRequestMapper.mapToStockRequestDto(updatedStockRequest);
            return new ResponseEntity<>(updatedStockRequestDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<String> deletedStockRequestById(@PathVariable Long requestId) {
        String result = stockRequestService.deleteStockRequestById(requestId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
