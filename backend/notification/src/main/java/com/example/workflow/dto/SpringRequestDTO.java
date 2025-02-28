package com.example.workflow.dto;

import java.time.LocalDate;

import com.example.workflow.model.StockRequest;
import com.example.workflow.model.UserHospital;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpringRequestDto {
    private Long id;
    private StockRequest stockRequest;
    private String camundaTaskId;
    private UserHospital userApprove;
    private Boolean approverApproveStatus;
    private UserHospital userDirector;
    private Boolean directorApproveStatus;
    private LocalDate directorApproveDate;
    private Boolean allCompleteStatus;

}
