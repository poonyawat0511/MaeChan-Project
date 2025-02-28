package com.example.workflow.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SpringRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_request_id", referencedColumnName = "id")
    private StockRequest stockRequest;

    @Column(name = "camunda_task_id")
    private String camundaTaskId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_approve_id", referencedColumnName = "stockUserId")
    private UserHospital userApprove;

    @Column(name = "approver_approve_status")
    private Boolean approverApproveStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_director_id", referencedColumnName = "stockUserId")
    private UserHospital userDirector;

    @Column(name = "director_approve_status")
    private Boolean directorApproveStatus;

    @Column(name = "director_approve_date")
    private LocalDate directorApproveDate;

    @Column(name = "all_complete_status")
    private Boolean allCompleteStatus;

 
}