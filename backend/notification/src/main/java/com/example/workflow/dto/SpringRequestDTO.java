package com.example.workflow.dto;

import java.time.LocalDate;

import com.example.workflow.model.StockRequest;
import com.example.workflow.model.StockUser;

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
    private StockUser userApprove;
    private Boolean approverApproveStatus;
    private StockUser userDirector;
    private Boolean directorApproveStatus;
    private LocalDate directorApproveDate;
    private Boolean allCompleteStatus;

}
