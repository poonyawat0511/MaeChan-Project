package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.UserHospitalRepository;

@Service
public class UserHospitalService {

    @Autowired
    UserHospitalRepository userHospitalRepository;

    public UserHospital creatUserHospital(UserHospital userHospital) {
        return userHospitalRepository.save(userHospital);
    }

    public List<UserHospital> findAllUserHospital() {
        return userHospitalRepository.findAll();
    }

    public UserHospital findUserHospitalById(Long id) {
        Optional<UserHospital> userHospital = userHospitalRepository.findById(id);
        return userHospital.orElse(null);
    }

    public UserHospital updateUserHospital(UserHospital updatedUserHospital) {
        return userHospitalRepository.findById(updatedUserHospital.getId())
                .map(existingUserHospital -> {
                    existingUserHospital.setId(updatedUserHospital.getId());
                    existingUserHospital.setFirstName(updatedUserHospital.getFirstName());
                    existingUserHospital.setLastName(updatedUserHospital.getLastName());
                    existingUserHospital.setHospitalId(updatedUserHospital.getHospitalId());
                    return userHospitalRepository.save(existingUserHospital);
                })
                .orElseThrow(() -> new RuntimeException("UserHospital not found with id: " + updatedUserHospital.getId()));
    }

    public String deleteUserHospitalById(Long id) {
        userHospitalRepository.deleteById(id);
        return "UserHospital id:" + id + " has been deleted";
    }
}
