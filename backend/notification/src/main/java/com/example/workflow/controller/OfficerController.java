package com.example.workflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.model.Officer;
import com.example.workflow.service.OfficerService;

@RestController
@RequestMapping("/officers")
public class OfficerController {

    @Autowired
    private OfficerService officerService;

    @PostMapping
    public ResponseEntity<Officer> createOfficer(@RequestBody Officer officer) {
        Officer createofficer = officerService.createOfficer(officer);
        return new ResponseEntity<>(createofficer, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Officer>> getOfficerList() {
        List<Officer> officer = officerService.findAllOfficer();
        return new ResponseEntity<>(officer, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Officer> getOfficerById(@PathVariable Long id) {
        Officer officer = officerService.findOfficerById(id);
        if (officer != null) {
            return new ResponseEntity<>(officer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Officer> updateStockUserById(@PathVariable Long id, @RequestBody Officer officer) {
        officer.setOfficerId(id);
        Officer updatedOfficer = officerService.updateOfficer(officer);
        if (updatedOfficer != null) {
            return new ResponseEntity<>(updatedOfficer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletedOfficerById(@PathVariable Long id) {
        String result = officerService.deleteOfficerById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
