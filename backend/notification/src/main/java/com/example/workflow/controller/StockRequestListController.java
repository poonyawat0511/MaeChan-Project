package com.example.workflow.controller;

import com.example.workflow.dto.StockRequestListDto;
import com.example.workflow.mapper.StockRequestListMapper;
import com.example.workflow.model.StockRequestList;
import com.example.workflow.service.StockRequestListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stock-request-list")
public class StockRequestListController {

    @Autowired
    private StockRequestListService stockRequestListService;

    @Autowired
    private StockRequestListMapper stockRequestListMapper;

    @PostMapping("/batch")
    public ResponseEntity<List<StockRequestListDto>> getStockRequestListByRequestIds(@RequestBody List<Long> requestIds) {
        List<StockRequestList> stockRequestLists = stockRequestListService.findByRequestIds(requestIds);
        List<StockRequestListDto> dtos = stockRequestLists.stream()
                .map(stockRequestListMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping
    public ResponseEntity<List<StockRequestListDto>> getAllStockRequestLists() {
        List<StockRequestList> stockRequestLists = stockRequestListService.findAll();
        List<StockRequestListDto> stockRequestListDtos = stockRequestLists.stream()
            .map(stockRequestListMapper::toDto)
            .collect(Collectors.toList());
        return new ResponseEntity<>(stockRequestListDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockRequestListDto> getStockRequestListById(@PathVariable Long id) {
        Optional<StockRequestList> stockRequestList = stockRequestListService.findById(id);
        return stockRequestList.map(value -> ResponseEntity.ok(stockRequestListMapper.toDto(value)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockRequestListDto> createStockRequestList(@RequestBody StockRequestListDto stockRequestListDto) {
        StockRequestList stockRequestList = stockRequestListMapper.toEntity(stockRequestListDto);
        StockRequestList createdStockRequestList = stockRequestListService.save(stockRequestList);
        return new ResponseEntity<>(stockRequestListMapper.toDto(createdStockRequestList), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockRequestListDto> updateStockRequestList(@PathVariable Long id, @RequestBody StockRequestListDto stockRequestListDto) {
        Optional<StockRequestList> stockRequestListOptional = stockRequestListService.findById(id);
        if (stockRequestListOptional.isPresent()) {
            StockRequestList stockRequestList = stockRequestListMapper.toEntity(stockRequestListDto);
            StockRequestList updatedStockRequestList = stockRequestListService.save(stockRequestList);
            return new ResponseEntity<>(stockRequestListMapper.toDto(updatedStockRequestList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockRequestList(@PathVariable Long id) {
        stockRequestListService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
