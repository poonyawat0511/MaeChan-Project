package com.example.workflow.controller;

import java.util.HashMap;
import java.util.Map;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workflow")
public class WorkflowController {

    @Autowired
    private RuntimeService runtimeService;

    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startWorkflow(@RequestParam Long requestId) {
        if (requestId == null || requestId <= 0) {
            throw new IllegalArgumentException("Invalid requestId: must be a positive number.");
        }

        // Add variables for the process instance
        Map<String, Object> variables = new HashMap<>();
        variables.put("requestId", requestId);

        // Start the process instance
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("purchaseRequestWorkflow", variables);

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Workflow started successfully");
        response.put("processInstanceId", processInstance.getId());
        response.put("businessKey", processInstance.getBusinessKey());

        return ResponseEntity.ok(response);
    }

    // Handle exceptions globally for this controller
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "An unexpected error occurred: " + ex.getMessage());
        return ResponseEntity.internalServerError().body(errorResponse);
    }
}
