package com.example.workflow.controller;

import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class controller {

    Logger logger = Logger.getLogger(this.getClass().getName());

    @PostMapping(value = "/message", consumes = "application/octet-stream")
    public ResponseEntity<String> createMessage(@RequestBody byte[] data) {
        logger.info("-------Message Creator Initialized with Octet Stream-------");

        // Process byte[] data as needed, e.g., convert to String or parse it
        String messageContent = new String(data);  // For example, convert byte array to String
        logger.info("Message content --> " + messageContent);

        return ResponseEntity.ok("Data received");
    }
}
