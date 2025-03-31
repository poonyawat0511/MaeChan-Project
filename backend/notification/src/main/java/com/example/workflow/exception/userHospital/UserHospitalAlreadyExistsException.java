package com.example.workflow.exception.userHospital;

public class UserHospitalAlreadyExistsException extends RuntimeException {

    public UserHospitalAlreadyExistsException(String email) {
        super("UserHospital already exists with email: " + email);
    }
}
