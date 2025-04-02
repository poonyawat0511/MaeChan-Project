package com.example.workflow.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stock_budget_type")
public class StockBudgetType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_budget_type_id")
    private Long stockBudgetTypeId;

    @Column(name = "stock_budget_type_name")
    private String stockBudgetTypeName;

    @Column(name = "acc_po_budget_type_id")
    private Long accPoBudgetTypeId;

    public StockBudgetType() {
    }

    public StockBudgetType(Long stockBudgetTypeId) {
        this.stockBudgetTypeId = stockBudgetTypeId;
    }

    public StockBudgetType(Long stockBudgetTypeId, String stockBudgetTypeName, Long accPoBudgetTypeId) {
        this.stockBudgetTypeId = stockBudgetTypeId;
        this.stockBudgetTypeName = stockBudgetTypeName;
        this.accPoBudgetTypeId = accPoBudgetTypeId;
    }
    
    public Long getStockBudgetTypeId() {
        return stockBudgetTypeId;
    }

    public void setStockBudgetTypeId(Long stockBudgetTypeId) {
        this.stockBudgetTypeId = stockBudgetTypeId;
    }

    public String getStockBudgetTypeName() {
        return stockBudgetTypeName;
    }

    public void setStockBudgetTypeName(String stockBudgetTypeName) {
        this.stockBudgetTypeName = stockBudgetTypeName;
    }

    public Long getAccPoBudgetTypeId() {
        return accPoBudgetTypeId;
    }

    public void setAccPoBudgetTypeId(Long accPoBudgetTypeId) {
        this.accPoBudgetTypeId = accPoBudgetTypeId;
    }
}
