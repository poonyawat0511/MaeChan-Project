package com.example.workflow.service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.dto.DashboardSummaryDTO;
import com.example.workflow.model.StockBudgetList;
import com.example.workflow.model.StockPo;
import com.example.workflow.model.StockRequest;
import com.example.workflow.repository.StockBudgetListRepository;
import com.example.workflow.repository.StockPoRepository;
import com.example.workflow.repository.StockRequestRepository;

@Service
public class DashboardSummaryService {

    @Autowired
    private StockRequestRepository requestRepository;

    @Autowired
    private StockPoRepository poRepository;

    @Autowired
    private StockBudgetListRepository budgetListRepository;

    public DashboardSummaryDTO getDashboardSummary(int year, String monthShort, List<String> departments) {
        DashboardSummaryDTO dto = new DashboardSummaryDTO();

        Locale localeTH = new Locale("th", "TH");

        List<StockRequest> allRequests = requestRepository.findAll();
        List<StockPo> allPo = poRepository.findAll();
        List<StockBudgetList> budgetList = budgetListRepository.findAll();

        // Filter
        List<StockRequest> filteredRequests = allRequests.stream()
                .filter(r -> r.getRequestDate() != null && r.getRequestDate().getYear() == year)
                .collect(Collectors.toList());

        List<StockPo> filteredPo = allPo.stream()
                .filter(p -> p.getStockPoDate() != null && p.getStockPoDate().getYear() == year)
                .collect(Collectors.toList());

        List<String> targetDepartments = (departments != null && !departments.isEmpty())
                ? departments
                : filteredRequests.stream()
                        .map(r -> r.getDepartmentId() != null ? r.getDepartmentId().getDepartmentName() : "ไม่ทราบแผนก")
                        .distinct().toList();

        // 1. Monthly Purchases
        double monthlyPurchase = filteredPo.stream()
                .filter(p -> monthShort.equals(p.getStockPoDate().getMonth().getDisplayName(TextStyle.SHORT, localeTH)))
                .mapToDouble(p -> p.getPoAmount() != null ? p.getPoAmount().doubleValue() : 0)
                .sum();
        dto.setMonthlyPurchases(monthlyPurchase);

        // 2. formattedInventoryData
        List<Map<String, Object>> inventoryData = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            final int monthIndex = i + 1;
            String shortMonth = LocalDate.of(year, monthIndex, 1)
                    .getMonth()
                    .getDisplayName(TextStyle.SHORT, localeTH);

            double value = filteredPo.stream()
                    .filter(p -> p.getStockPoDate().getMonthValue() == monthIndex)
                    .mapToDouble(p -> p.getPoAmount() != null ? p.getPoAmount().doubleValue() : 0)
                    .sum();

            Map<String, Object> entry = new HashMap<>();
            entry.put("month", shortMonth);
            entry.put("value", value);
            inventoryData.add(entry);
        }
        dto.setFormattedInventoryData(inventoryData);

        // 3. formattedWarehouseData
        List<Map<String, Object>> warehouseData = new ArrayList<>();
        filteredPo.stream()
                .filter(p -> monthShort.equals(p.getStockPoDate().getMonth().getDisplayName(TextStyle.SHORT, localeTH)))
                .collect(Collectors.groupingBy(p
                        -> p.getWarehouseId() != null ? p.getWarehouseId().getWarehouseName() : "ไม่ระบุคลัง"
                )).forEach((name, list) -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("name", name);
            entry.put("value", list.size());
            warehouseData.add(entry);
        });
        dto.setFormattedWarehouseData(warehouseData);

        // 4. filteredDepartmentData
        List<Map<String, Object>> departmentData = new ArrayList<>();
        for (String deptName : targetDepartments) {
            double prTotal = filteredRequests.stream()
                    .filter(r -> r.getDepartmentId() != null && deptName.equals(r.getDepartmentId().getDepartmentName()))
                    .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0)
                    .sum();

            double poTotal = filteredPo.stream()
                    .filter(p -> {
                        StockRequest req = p.getRefRequestId();
                        return req != null
                                && req.getDepartmentId() != null
                                && deptName.equals(req.getDepartmentId().getDepartmentName());
                    })
                    .mapToDouble(p -> p.getPoDeliverAmount() != null ? p.getPoDeliverAmount().doubleValue() : 0)
                    .sum();

            double poPercent = prTotal > 0 ? (poTotal / prTotal) * 100 : 0;

            Map<String, Object> entry = new HashMap<>();
            entry.put("department", deptName);
            entry.put("pr", prTotal);
            entry.put("po", poTotal);
            entry.put("poPercent", Math.round(poPercent * 10) / 10.0);
            departmentData.add(entry);
        }

        departmentData.sort((a, b) -> Double.compare((double) b.get("po"), (double) a.get("po")));
        dto.setFilteredDepartmentData(departmentData);

        // 5. prPoData
        List<Map<String, Object>> prPo = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            final int monthIndex = i + 1;
            String m = LocalDate.of(year, monthIndex, 1).getMonth()
                    .getDisplayName(TextStyle.SHORT, localeTH);

            double prVal = filteredRequests.stream()
                    .filter(r -> r.getRequestDate().getMonthValue() == monthIndex)
                    .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0)
                    .sum();

            double poVal = filteredPo.stream()
                    .filter(p -> p.getStockPoDate().getMonthValue() == monthIndex)
                    .mapToDouble(p -> p.getPoDeliverAmount() != null ? p.getPoDeliverAmount().doubleValue() : 0)
                    .sum();

            Map<String, Object> e = new HashMap<>();
            e.put("month", m);
            e.put("pr", prVal);
            e.put("po", poVal);
            prPo.add(e);
        }
        dto.setPrPoData(prPo);

        // 6. Summary stats
        dto.setTotalStockRequests(filteredRequests.size());
        dto.setTotalStockPo(filteredPo.size());

        double totalRequestValue = filteredRequests.stream()
                .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0).sum();
        dto.setTotalStockRequestValue(totalRequestValue);
        dto.setAvgStockRequestValue(totalRequestValue / 12);

        double highestRequest = filteredRequests.stream()
                .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0).max().orElse(0);
        dto.setHighestStockRequest(highestRequest);

        double totalPoValue = filteredPo.stream()
                .mapToDouble(p -> p.getStockBudgetUse() != null ? p.getStockBudgetUse().doubleValue() : 0).sum();
        dto.setTotalStockPoValue(totalPoValue);
        dto.setAvgStockPoValue(totalPoValue / 12);

        double highestPo = filteredPo.stream()
                .mapToDouble(p -> p.getStockBudgetUse() != null ? p.getStockBudgetUse().doubleValue() : 0).max().orElse(0);
        dto.setHighestStockPo(highestPo);

        dto.setPoPrRatio(filteredPo.size() > 0 ? (filteredRequests.size() / (double) filteredPo.size()) * 100 : 0);
        dto.setBudgetSaved(totalRequestValue - totalPoValue);

        // 7. Processing time avg
        double totalDays = filteredPo.stream().mapToDouble(p -> {
            StockRequest r = p.getRefRequestId();
            if (r == null || r.getRequestDate() == null || p.getStockPoDate() == null) {
                return 0;
            }
            return java.time.Duration.between(r.getRequestDate().atStartOfDay(), p.getStockPoDate().atStartOfDay()).toDays();
        }).sum();
        dto.setAvgProcessingTime(filteredPo.size() > 0 ? String.format("%.1f", totalDays / filteredPo.size()) : "0");

        // 8. pending PR
        long pending = filteredRequests.stream()
                .filter(r -> allPo.stream().noneMatch(p -> p.getRefRequestId() != null && p.getRefRequestId().getRequestId().equals(r.getRequestId())))
                .count();
        dto.setPendingPr((int) pending);

        // 9. Budget Summary
        String thaiYear = String.valueOf(year + 543);
        List<StockBudgetList> filteredBudgets = budgetList.stream()
                .filter(b -> thaiYear.equals(b.getStockBudgetYear()))
                .toList();

        dto.setTotalBudgetListValue(filteredBudgets.stream().mapToDouble(b -> b.getStockBudgetPrice() != null ? b.getStockBudgetPrice().doubleValue() : 0).sum());
        dto.setTotalBudgetUsed(filteredBudgets.stream().mapToDouble(b -> b.getStockBudgetUse() != null ? b.getStockBudgetUse().doubleValue() : 0).sum());
        dto.setTotalBudgetRemain(filteredBudgets.stream().mapToDouble(b -> b.getStockBudgetRemain() != null ? b.getStockBudgetRemain().doubleValue() : 0).sum());

        return dto;
    }

    public List<Integer> getAvailableYears() {
        Set<Integer> years = new TreeSet<>(Comparator.reverseOrder());
    
        requestRepository.findAll().stream()
            .filter(r -> r.getRequestDate() != null)
            .map(r -> r.getRequestDate().getYear())
            .forEach(years::add);
    
        poRepository.findAll().stream()
            .filter(p -> p.getStockPoDate() != null)
            .map(p -> p.getStockPoDate().getYear())
            .forEach(years::add);
    
        return new ArrayList<>(years);
    }
}
