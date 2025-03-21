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

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_budget_list_tr")
public class StockBudgetListTr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_budget_list_tr_id")
    private Long stockBudgetListTrId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_budget_list_id", referencedColumnName = "stock_budget_list_id")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stockBudgetListId")
    private StockBudgetList stockBudgetListId;

    @Column(name = "budget_price")
    private BigDecimal budgetPrice;

    @Column(name = "budget_date")
    private Date budgetDate;

    @Column(name = "budget_note")
    private String budgetNote;

    @Column(name = "update_datetime")
    private Timestamp updateDatetime;

    // Add constructor to accept integer argument
    public StockBudgetListTr(Long stockBudgetListTrId) {
        this.stockBudgetListTrId = stockBudgetListTrId;
    }
}
