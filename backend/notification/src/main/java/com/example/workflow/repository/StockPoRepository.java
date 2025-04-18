package com.example.workflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockPo;

@Repository
public interface StockPoRepository extends JpaRepository<StockPo, Long> {

    @Query("SELECT p FROM StockPo p WHERE YEAR(p.stockPoDate) = :year")
    List<StockPo> findByYear(@Param("year") int year);

    @Query("SELECT DISTINCT YEAR(p.stockPoDate) FROM StockPo p WHERE p.stockPoDate IS NOT NULL")
    List<Integer> findDistinctYears();
}
