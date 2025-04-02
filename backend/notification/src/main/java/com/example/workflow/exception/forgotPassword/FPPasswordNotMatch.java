package com.example.workflow.exception.forgotPassword;

public class FPPasswordNotMatch extends RuntimeException {
    public FPPasswordNotMatch() {
        super("new Password and confirm Password not match.");
    }
}
