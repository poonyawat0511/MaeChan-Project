package com.example.workflow.exception.forgotPassword;

public class FPUserHospitalNotFound extends RuntimeException{
    public FPUserHospitalNotFound() {
        super("First name, Last name, or Email does not match any userHospital.");
    }
}
