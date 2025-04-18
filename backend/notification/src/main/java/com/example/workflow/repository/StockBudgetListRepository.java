package com.example.workflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockBudgetList;

@Repository
public interface StockBudgetListRepository extends JpaRepository<StockBudgetList, Long> {

    @Query("SELECT b FROM StockBudgetList b WHERE b.stockBudgetYear = :thaiYear")
    List<StockBudgetList> findByThaiYear(@Param("thaiYear") String thaiYear);

}
