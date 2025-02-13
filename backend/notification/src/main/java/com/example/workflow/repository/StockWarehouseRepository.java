package com.example.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.workflow.model.StockWarehouse;

public interface StockWarehouseRepository extends JpaRepository<StockWarehouse, Long> {
}
