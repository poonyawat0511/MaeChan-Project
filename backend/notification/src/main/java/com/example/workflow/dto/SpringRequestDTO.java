package com.example.workflow.dto;

import java.time.LocalDate;

public class SpringRequestDTO {

    private Long id;
    private String camundaTaskId;
    private Long userApproveId;
    private String approverApproveStatus;
    private Long userDirectorId;
    private String directorApproveStatus;
    private LocalDate directorApproveDate;
    private Boolean allCompleteStatus;

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



    public Long getUserApproveId() {

        return userApproveId;

    }



    public void setUserApproveId(Long userApproveId) {

        this.userApproveId = userApproveId;

    }



    public String getApproverApproveStatus() {

        return approverApproveStatus;

    }



    public void setApproverApproveStatus(String approverApproveStatus) {

        this.approverApproveStatus = approverApproveStatus;

    }



    public Long getUserDirectorId() {

        return userDirectorId;

    }



    public void setUserDirectorId(Long userDirectorId) {

        this.userDirectorId = userDirectorId;

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
