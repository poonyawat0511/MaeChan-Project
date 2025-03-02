package com.example.workflow.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private boolean budgetStatus;

    // Add relation
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_budget_type_id", referencedColumnName = "stock_budget_type_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockBudgetTypeId")
    private StockBudgetType stockBudgetTypeId;

    @Column(name = "acc_po_budget_sub_type_id")
    private Long accPoBudgetSubTypeId;


}
