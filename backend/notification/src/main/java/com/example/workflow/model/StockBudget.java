package com.example.workflow.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "stock_budget")
public class StockBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long budgetId;

    @Column(name = "budget_name")
    private String budgetName;

    @Column(name = "budget_status")
    private Character budgetStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_budget_type_id", referencedColumnName = "stock_budget_type_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockBudgetTypeId")
    private StockBudgetType stockBudgetTypeId;

    @Column(name = "acc_po_budget_sub_type_id")
    private Long accPoBudgetSubTypeId;


    public StockBudget() {
    }

    public StockBudget(Long budgetId, String budgetName, Character budgetStatus,
                       StockBudgetType stockBudgetTypeId, Long accPoBudgetSubTypeId) {
        this.budgetId = budgetId;
        this.budgetName = budgetName;
        this.budgetStatus = budgetStatus;
        this.stockBudgetTypeId = stockBudgetTypeId;
        this.accPoBudgetSubTypeId = accPoBudgetSubTypeId;
    }

    public StockBudget(Long budgetId) {
        this.budgetId = budgetId;
    }

    public Long getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
    }

    public String getBudgetName() {
        return budgetName;
    }

    public void setBudgetName(String budgetName) {
        this.budgetName = budgetName;
    }

    public Character getBudgetStatus() {
        return budgetStatus;
    }

    public void setBudgetStatus(Character budgetStatus) {
        this.budgetStatus = budgetStatus;
    }

    public StockBudgetType getStockBudgetTypeId() {
        return stockBudgetTypeId;
    }

    public void setStockBudgetTypeId(StockBudgetType stockBudgetTypeId) {
        this.stockBudgetTypeId = stockBudgetTypeId;
    }

    public Long getAccPoBudgetSubTypeId() {
        return accPoBudgetSubTypeId;
    }

    public void setAccPoBudgetSubTypeId(Long accPoBudgetSubTypeId) {
        this.accPoBudgetSubTypeId = accPoBudgetSubTypeId;
    }
}
