package com.example.workflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.dto.DashboardSummaryDTO;
import com.example.workflow.service.DashboardSummaryService;

@RestController
@RequestMapping("/dashboard-summary")
public class DashboardSummaryController {

    @Autowired
    DashboardSummaryService dashboardSummaryService;

    @GetMapping
    public DashboardSummaryDTO getSummary(
            @RequestParam int year,
            @RequestParam String month,
            @RequestParam(required = false) List<String> departments
    ) {
        if (departments == null) departments = List.of(); // all
        return dashboardSummaryService.getDashboardSummary(year, month, departments);
    }

     @GetMapping("/years")
    public ResponseEntity<List<Integer>> getAvailableYears() {
        List<Integer> years = dashboardSummaryService.getAvailableYears();
        return ResponseEntity.ok(years);
    }
}
