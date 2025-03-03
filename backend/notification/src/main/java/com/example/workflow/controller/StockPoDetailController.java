package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;
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

import com.example.workflow.dto.StockPoDetailDto;
import com.example.workflow.mapper.StockPoDetailMapper;
import com.example.workflow.model.StockPoDetail;
import com.example.workflow.service.StockPoDetailService;

@RestController
@RequestMapping("/stock-po-details")
public class StockPoDetailController {

    @Autowired
    private StockPoDetailService stockPoDetailService;

    @Autowired
    private StockPoDetailMapper stockPoDetailMapper;

    @GetMapping
    public ResponseEntity<List<StockPoDetailDto>> getAllStockPoDetails() {
        List<StockPoDetail> stockPoDetails = stockPoDetailService.findAll();
        List<StockPoDetailDto> stockPoDetailDtos = stockPoDetails.stream()
            .map(stockPoDetailMapper::toDto)
            .collect(Collectors.toList());
        return new ResponseEntity<>(stockPoDetailDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPoDetailDto> getStockPoDetailById(@PathVariable Long id) {
        Optional<StockPoDetail> stockPoDetail = stockPoDetailService.findById(id);
        return stockPoDetail.map(detail -> ResponseEntity.ok(stockPoDetailMapper.toDto(detail)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockPoDetailDto> createStockPoDetail(@RequestBody StockPoDetailDto stockPoDetailDto) {
        StockPoDetail stockPoDetail = stockPoDetailMapper.toEntity(stockPoDetailDto);
        StockPoDetail createdStockPoDetail = stockPoDetailService.save(stockPoDetail);
        return new ResponseEntity<>(stockPoDetailMapper.toDto(createdStockPoDetail), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockPoDetailDto> updateStockPoDetail(@PathVariable Long id, @RequestBody StockPoDetailDto stockPoDetailDto) {
        if (!stockPoDetailService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockPoDetailDto.setStockPoDetailId(id);
        StockPoDetail stockPoDetail = stockPoDetailMapper.toEntity(stockPoDetailDto);
        StockPoDetail updatedStockPoDetail = stockPoDetailService.save(stockPoDetail);
        return new ResponseEntity<>(stockPoDetailMapper.toDto(updatedStockPoDetail), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockPoDetail(@PathVariable Long id) {
        if (!stockPoDetailService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stockPoDetailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
