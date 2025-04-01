package com.example.workflow.exception.notifyTime;

public class NotifyTimeNotFoundException extends RuntimeException {
    public NotifyTimeNotFoundException(Long id){
        super("Time not found with id: " + id);
    }

    public NotifyTimeNotFoundException(String message){
        super(message);
    }
}
