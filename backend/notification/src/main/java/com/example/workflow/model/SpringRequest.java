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


@Entity
public class SpringRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "camunda_task_id")
    private String camundaTaskId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_approve_id", referencedColumnName = "stockUserId")
    private StockUser userApprove;

    @Column(name = "approver_approve_status")
    private String approverApproveStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_director_id", referencedColumnName = "stockUserId")
    private StockUser userDirector;

    @Column(name = "director_approve_status")
    private String directorApproveStatus;

    @Column(name = "director_approve_date")
    private LocalDate directorApproveDate;

    @Column(name = "all_complete_status")
    private Boolean allCompleteStatus;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCamundaTaskId() {
        return camundaTaskId;
    }

    public void setCamundaTaskId(String camundaTaskId) {
        this.camundaTaskId = camundaTaskId;
    }

    public StockUser getUserApprove() {
        return userApprove;
    }

    public void setUserApprove(StockUser userApprove) {
        this.userApprove = userApprove;
    }

    public String getApproverApproveStatus() {
        return approverApproveStatus;
    }

    public void setApproverApproveStatus(String approverApproveStatus) {
        this.approverApproveStatus = approverApproveStatus;
    }

    public StockUser getUserDirector() {
        return userDirector;
    }

    public void setUserDirector(StockUser userDirector) {
        this.userDirector = userDirector;
    }

    public String getDirectorApproveStatus() {
        return directorApproveStatus;
    }

    public void setDirectorApproveStatus(String directorApproveStatus) {
        this.directorApproveStatus = directorApproveStatus;
    }

    public LocalDate getDirectorApproveDate() {
        return directorApproveDate;
    }

    public void setDirectorApproveDate(LocalDate directorApproveDate) {
        this.directorApproveDate = directorApproveDate;
    }

    public Boolean getAllCompleteStatus() {
        return allCompleteStatus;
    }

    public void setAllCompleteStatus(Boolean allCompleteStatus) {
        this.allCompleteStatus = allCompleteStatus;
    }
}