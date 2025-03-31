package com.example.workflow.exception.userHospital;

public class UserHospitalNotFoundException extends RuntimeException {
    public UserHospitalNotFoundException(Long id){
        super("UserHospital not found with id: " + id);
    }

    public UserHospitalNotFoundException(String message){
        super(message);
    }
}
