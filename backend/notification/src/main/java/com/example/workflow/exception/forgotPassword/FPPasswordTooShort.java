package com.example.workflow.exception.forgotPassword;

public class FPPasswordTooShort extends RuntimeException {
    public FPPasswordTooShort() {
        super("Password must be at least 8 characters long.");
    }

}
