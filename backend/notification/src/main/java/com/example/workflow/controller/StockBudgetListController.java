package com.example.workflow.controller;

import java.util.List;
import java.util.Optional;

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

import com.example.workflow.dto.StockBudgetListDto;
import com.example.workflow.mapper.StockBudgetListMapper;
import com.example.workflow.model.StockBudgetList;
import com.example.workflow.service.StockBudgetListService;

@RestController
@RequestMapping("/stock-budget-list")
public class StockBudgetListController {

    @Autowired
    private StockBudgetListService stockBudgetListService;

    @Autowired
    private StockBudgetListMapper stockBudgetListMapper;

    @PostMapping
    public ResponseEntity<StockBudgetList> createStockBudgetList(@RequestBody StockBudgetList stockBudgetList) {
        StockBudgetList createdStockBudgetList = stockBudgetListService.save(stockBudgetList);
        return new ResponseEntity<>(createdStockBudgetList, HttpStatus.CREATED);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<StockBudgetListDto>> getPaginatedStockBudgetLists(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<StockBudgetList> stockBudgetListsPage = stockBudgetListService.findAll(pageable);
        Page<StockBudgetListDto> dtoPage = stockBudgetListsPage.map(stockBudgetListMapper::toDto);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping
    public ResponseEntity<List<StockBudgetList>> getAllStockBudgetLists() {
        List<StockBudgetList> stockBudgetLists = stockBudgetListService.findAll();
        return new ResponseEntity<>(stockBudgetLists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockBudgetList> getStockBudgetListById(@PathVariable Long id) {
        Optional<StockBudgetList> stockBudgetList = stockBudgetListService.findById(id);
        return stockBudgetList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StockBudgetList> updateStockBudgetList(@PathVariable Long id, @RequestBody StockBudgetList stockBudgetListDetails) {
        Optional<StockBudgetList> stockBudgetList = stockBudgetListService.findById(id);
        if (stockBudgetList.isPresent()) {
            StockBudgetList updatedStockBudgetList = stockBudgetList.get();
            updatedStockBudgetList.setStockBudgetYear(stockBudgetListDetails.getStockBudgetYear());
            updatedStockBudgetList.setStockBudgetPrice(stockBudgetListDetails.getStockBudgetPrice());
            updatedStockBudgetList.setStockBudgetRemain(stockBudgetListDetails.getStockBudgetRemain());
            updatedStockBudgetList.setStockBudgetUse(stockBudgetListDetails.getStockBudgetUse());
            updatedStockBudgetList.setStockBudgetRcvPrice(stockBudgetListDetails.getStockBudgetRcvPrice());
            return new ResponseEntity<>(stockBudgetListService.save(updatedStockBudgetList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStockBudgetList(@PathVariable Long id) {
        stockBudgetListService.deleteById(id);
        return new ResponseEntity<>("StockBudgetList deleted successfully", HttpStatus.OK);
    }
}
