package com.example.workflow.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_budget")
public class StockBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "budget_name")
    private String budgetName;

    @Column(name = "budget_status")
    private boolean budgetStatus;

    @Column(name = "stock_budget_type_id")
    private Long stockBudgetTypeId;

    @Column(name = "acc_po_budget_sub_type_id")
    private Long accPoBudgetSubTypeId;


}
