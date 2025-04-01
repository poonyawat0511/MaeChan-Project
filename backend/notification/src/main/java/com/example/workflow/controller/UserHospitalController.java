package com.example.workflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.workflow.dto.UserHospitalDto;
import com.example.workflow.mapper.UserHospitalMapper;
import com.example.workflow.model.UserHospital;
import com.example.workflow.service.UserHospitalService;

@RestController
@RequestMapping("/user-hospital")
public class UserHospitalController {

    @Autowired
    private UserHospitalService userHospitalService;

    @PostMapping
    public ResponseEntity<UserHospital> createUserHospital(@RequestBody UserHospital userHospital) {
        UserHospital created = userHospitalService.createUserHospital(userHospital);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<UserHospitalDto>> getUserhospitalList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size,
            @RequestParam(required = false) String search) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserHospital> userHospitalsPage = userHospitalService.findAllUserHospitals(search, pageable);
        Page<UserHospitalDto> dtoPage = userHospitalsPage.map(UserHospitalMapper::mapToUserHospitalDto);

        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping
    public ResponseEntity<List<UserHospital>> getUserHospitalList() {
        return ResponseEntity.ok(userHospitalService.findAllUserHospital());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserHospital> getUserHospitalById(@PathVariable Long id) {
        UserHospital userHospital = userHospitalService.findUserHospitalById(id);
        return ResponseEntity.ok(userHospital);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserHospital> updateUserHospitalById(
            @PathVariable Long id,
            @RequestBody UserHospital userHospital) {

        userHospital.setId(id);
        UserHospital updated = userHospitalService.updateUserHospital(userHospital);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userHospitalService.deleteUserHospitalById(id);
        return ResponseEntity.noContent().build();
    }

}
