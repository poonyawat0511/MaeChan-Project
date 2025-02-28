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

import com.example.workflow.model.UserHospital;
import com.example.workflow.service.UserHospitalService;


@RestController
@RequestMapping("/user-hospital")
public class UserHospitalController {
    @Autowired
    private UserHospitalService userHospitalService;

    @PostMapping
    public ResponseEntity<UserHospital> createUserHospital(@RequestBody UserHospital userHospital) {
        UserHospital createStockUser = userHospitalService.createUserHospital(userHospital);
        return new ResponseEntity<>(createStockUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserHospital>> getUserHospitalList() {
        List<UserHospital> userHospital = userHospitalService.findAllUserHospital();
        return new ResponseEntity<>(userHospital, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserHospital> getUserHospitalById(@PathVariable Long id) {
        UserHospital userHospital = userHospitalService.findUserHospitalById(id);
        if (userHospital != null) {
            return new ResponseEntity<>(userHospital, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<UserHospital> updateUserHospitalById(@PathVariable Long id, @RequestBody UserHospital userHospital) {
        userHospital.setId(id);
        UserHospital updatedUserHospital = userHospitalService.updateUserHospital(userHospital);
        if (updatedUserHospital != null) {
            return new ResponseEntity<>(updatedUserHospital, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletedUserHospitalById(@PathVariable Long id) {
        String result = userHospitalService.deleteUserHospitalById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
