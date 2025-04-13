package com.example.workflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockRequestList;

@Repository
public interface StockRequestListRepository extends JpaRepository<StockRequestList, Long> {
    List<StockRequestList> findByRequestId_RequestIdIn(List<Long> requestIds);
}
