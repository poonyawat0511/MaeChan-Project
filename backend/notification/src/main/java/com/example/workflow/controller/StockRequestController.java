package com.example.workflow.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/paginated")
    public ResponseEntity<Page<StockRequestDto>> getStockRequestList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<StockRequest> stockRequestPage = stockRequestService.findAllStockRequests(pageable);
        Page<StockRequestDto> dtoPage = stockRequestPage.map(StockRequestMapper::mapToStockRequestDto);

        return new ResponseEntity<>(dtoPage, HttpStatus.OK);
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
