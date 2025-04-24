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
import java.util.stream.IntStream;

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

        List<StockRequest> filteredRequests = requestRepository.findByYear(year);
        List<StockPo> filteredPo = poRepository.findByYear(year);
        List<StockBudgetList> budgetList = budgetListRepository.findByThaiYear(String.valueOf(year + 543));

        List<String> targetDepartments = (departments != null && !departments.isEmpty()) ? departments
                : filteredRequests.stream()
                        .map(r -> r.getDepartmentId() != null ? r.getDepartmentId().getDepartmentName() : "ไม่ทราบแผนก")
                        .distinct().toList();

        double monthlyPurchase = filteredPo.stream()
                .filter(p -> monthShort.equals(p.getStockPoDate().getMonth().getDisplayName(TextStyle.SHORT, localeTH)))
                .mapToDouble(p -> p.getPoAmount() != null ? p.getPoAmount().doubleValue() : 0)
                .sum();
        dto.setMonthlyPurchases(monthlyPurchase);

        List<Map<String, Object>> inventoryData = IntStream.rangeClosed(1, 12)
                .mapToObj(i -> {
                    String m = LocalDate.of(year, i, 1).getMonth().getDisplayName(TextStyle.SHORT, localeTH);
                    double value = filteredPo.stream()
                            .filter(p -> p.getStockPoDate().getMonthValue() == i)
                            .mapToDouble(p -> p.getPoAmount() != null ? p.getPoAmount().doubleValue() : 0)
                            .sum();
                    Map<String, Object> map = new HashMap<>();
                    map.put("month", m);
                    map.put("value", value);
                    return map;
                }).toList();
        dto.setFormattedInventoryData(inventoryData);

        Map<String, Long> groupedWarehouse = filteredPo.stream()
                .filter(p -> monthShort.equals(p.getStockPoDate().getMonth().getDisplayName(TextStyle.SHORT, localeTH)))
                .collect(Collectors.groupingBy(
                        p -> p.getWarehouseId() != null ? p.getWarehouseId().getWarehouseName() : "ไม่ระบุคลัง",
                        Collectors.counting()
                ));
        List<Map<String, Object>> warehouseData = new ArrayList<>();
        groupedWarehouse.forEach((key, value) -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", key);
            map.put("value", value);
            warehouseData.add(map);
        });
        dto.setFormattedWarehouseData(warehouseData);

        List<Map<String, Object>> departmentData = new ArrayList<>();
        for (String deptName : targetDepartments) {
            double prTotal = filteredRequests.stream()
                    .filter(r -> r.getDepartmentId() != null
                    && r.getDepartmentId().getDepartmentName() != null
                    && deptName.trim().equalsIgnoreCase(r.getDepartmentId().getDepartmentName().trim()))
                    .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0)
                    .sum();

            double poTotal = filteredPo.stream()
                    .filter(p -> p.getRefRequestId() != null
                    && p.getRefRequestId().getDepartmentId() != null
                    && p.getRefRequestId().getDepartmentId().getDepartmentName() != null
                    && deptName.trim().equalsIgnoreCase(p.getRefRequestId().getDepartmentId().getDepartmentName().trim()))
                    .mapToDouble(p -> p.getPoDeliverAmount() != null ? p.getPoDeliverAmount().doubleValue() : 0)
                    .sum();

            double poPercent = prTotal > 0 ? (poTotal / prTotal) * 100 : 0;
            Map<String, Object> map = new HashMap<>();
            map.put("department", deptName);
            map.put("pr", prTotal);
            map.put("po", poTotal);
            map.put("poPercent", Math.round(poPercent * 10) / 10.0);
            departmentData.add(map);
        }
        departmentData.sort(Comparator.comparingDouble(d -> -((Double) d.get("po"))));
        dto.setFilteredDepartmentData(departmentData);

        List<Map<String, Object>> prPo = IntStream.rangeClosed(1, 12)
                .mapToObj(i -> {
                    String m = LocalDate.of(year, i, 1).getMonth().getDisplayName(TextStyle.SHORT, localeTH);
                    double prVal = filteredRequests.stream()
                            .filter(r -> r.getRequestDate().getMonthValue() == i)
                            .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0)
                            .sum();
                    double poVal = filteredPo.stream()
                            .filter(p -> p.getStockPoDate().getMonthValue() == i)
                            .mapToDouble(p -> p.getPoDeliverAmount() != null ? p.getPoDeliverAmount().doubleValue() : 0)
                            .sum();
                    Map<String, Object> map = new HashMap<>();
                    map.put("month", m);
                    map.put("pr", prVal);
                    map.put("po", poVal);
                    return map;
                }).toList();
        dto.setPrPoData(prPo);

        dto.setTotalStockRequests(filteredRequests.size());
        dto.setTotalStockPo(filteredPo.size());

        double totalRequestValue = filteredRequests.stream()
                .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0).sum();
        double totalPoValue = filteredPo.stream()
                .mapToDouble(p -> p.getStockBudgetUse() != null ? p.getStockBudgetUse().doubleValue() : 0).sum();

        dto.setTotalStockRequestValue(totalRequestValue);
        dto.setAvgStockRequestValue(totalRequestValue / 12);
        dto.setHighestStockRequest(filteredRequests.stream()
                .mapToDouble(r -> r.getRequestTotalPrice() != null ? r.getRequestTotalPrice().doubleValue() : 0).max().orElse(0));

        dto.setTotalStockPoValue(totalPoValue);
        dto.setAvgStockPoValue(totalPoValue / 12);
        dto.setHighestStockPo(filteredPo.stream()
                .mapToDouble(p -> p.getStockBudgetUse() != null ? p.getStockBudgetUse().doubleValue() : 0).max().orElse(0));

        dto.setPoPrRatio(filteredPo.size() > 0 ? (filteredRequests.size() / (double) filteredPo.size()) * 100 : 0);
        dto.setBudgetSaved(totalRequestValue - totalPoValue);

        double totalDays = filteredPo.stream().mapToDouble(p -> {
            StockRequest r = p.getRefRequestId();
            if (r == null || r.getRequestDate() == null || p.getStockPoDate() == null) {
                return 0;
            }
            return java.time.Duration.between(r.getRequestDate().atStartOfDay(), p.getStockPoDate().atStartOfDay()).toDays();
        }).sum();
        dto.setAvgProcessingTime(filteredPo.size() > 0 ? String.format("%.1f", totalDays / filteredPo.size()) : "0");

        long pending = filteredRequests.stream()
                .filter(r -> filteredPo.stream().noneMatch(p -> p.getRefRequestId() != null && p.getRefRequestId().getRequestId().equals(r.getRequestId())))
                .count();
        dto.setPendingPr((int) pending);

        dto.setTotalBudgetListValue(budgetList.stream().mapToDouble(b -> b.getStockBudgetPrice() != null ? b.getStockBudgetPrice().doubleValue() : 0).sum());
        dto.setTotalBudgetUsed(budgetList.stream().mapToDouble(b -> b.getStockBudgetUse() != null ? b.getStockBudgetUse().doubleValue() : 0).sum());
        dto.setTotalBudgetRemain(budgetList.stream().mapToDouble(b -> b.getStockBudgetRemain() != null ? b.getStockBudgetRemain().doubleValue() : 0).sum());

        return dto;
    }

    public List<Integer> getAvailableYears() {
        Set<Integer> years = new TreeSet<>(Comparator.reverseOrder());
        requestRepository.findDistinctYears().forEach(years::add);
        poRepository.findDistinctYears().forEach(years::add);
        return new ArrayList<>(years);
    }
}
