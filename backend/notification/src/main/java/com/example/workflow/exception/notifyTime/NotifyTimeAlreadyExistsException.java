package com.example.workflow.exception.notifyTime;

import java.time.LocalTime;

public class NotifyTimeAlreadyExistsException extends  RuntimeException{
    public NotifyTimeAlreadyExistsException(LocalTime time) {
        super("Time "+ time +" already exists");
    }
}
