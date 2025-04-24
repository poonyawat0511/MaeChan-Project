package com.example.workflow.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.workflow.model.StockRequest;

@Repository
public interface StockRequestRepository extends JpaRepository<StockRequest, Long> {

    @Query("SELECT s FROM StockRequest s "
            + "WHERE CAST(s.requestId AS string) LIKE CONCAT('%', :search, '%') "
            + "OR LOWER(s.requestNo) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<StockRequest> searchByRequestIdOrRequestNo(@Param("search") String search, Pageable pageable);

    @Query("SELECT r FROM StockRequest r WHERE YEAR(r.requestDate) = :year")
    List<StockRequest> findByYear(@Param("year") int year);

    @Query("SELECT DISTINCT YEAR(r.requestDate) FROM StockRequest r WHERE r.requestDate IS NOT NULL")
    List<Integer> findDistinctYears();
}
