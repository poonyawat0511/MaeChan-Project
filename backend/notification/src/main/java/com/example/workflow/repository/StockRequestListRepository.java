package com.example.workflow.repository;

import com.example.workflow.model.StockRequestList;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRequestListRepository extends JpaRepository<StockRequestList, Long> {
    List<StockRequestList> findByRequestId_RequestIdIn(List<Long> requestIds);
}
