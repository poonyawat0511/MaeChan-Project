package com.example.workflow.controller;

import com.example.workflow.dto.StockPoDto;
import com.example.workflow.mapper.StockPoMapper;
import com.example.workflow.model.StockPo;
import com.example.workflow.service.StockPoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stock-po")
public class StockPoController {

    @Autowired
    private StockPoService stockPoService;

    @Autowired
    private StockPoMapper stockPoMapper;

    @GetMapping
    public ResponseEntity<List<StockPoDto>> getAllStockPos() {
        List<StockPo> stockPos = stockPoService.findAll();
        List<StockPoDto> stockPoDtos = stockPos.stream()
                                               .map(stockPoMapper::toDto)
                                               .collect(Collectors.toList());
        return new ResponseEntity<>(stockPoDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockPoDto> getStockPoById(@PathVariable Long id) {
        Optional<StockPo> stockPo = stockPoService.findById(id);
        return stockPo.map(value -> new ResponseEntity<>(stockPoMapper.toDto(value), HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<StockPoDto> createStockPo(@RequestBody StockPoDto stockPoDto) {
        StockPo stockPo = stockPoMapper.toEntity(stockPoDto);
        StockPo createdStockPo = stockPoService.save(stockPo);
        return new ResponseEntity<>(stockPoMapper.toDto(createdStockPo), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockPoDto> updateStockPo(@PathVariable Long id, @RequestBody StockPoDto stockPoDto) {
        Optional<StockPo> stockPoOld = stockPoService.findById(id);
        if (stockPoOld.isPresent()) {
            StockPo stockPo = stockPoMapper.toEntity(stockPoDto);
            stockPo.setStockPoId(id);
            StockPo updatedStockPo = stockPoService.save(stockPo);
            return new ResponseEntity<>(stockPoMapper.toDto(updatedStockPo), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockPo(@PathVariable Long id) {
        stockPoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
