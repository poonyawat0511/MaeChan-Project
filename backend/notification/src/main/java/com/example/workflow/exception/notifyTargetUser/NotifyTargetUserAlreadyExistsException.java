package com.example.workflow.exception.notifyTargetUser;

public class NotifyTargetUserAlreadyExistsException extends RuntimeException {
    public NotifyTargetUserAlreadyExistsException(Long id) {
        super("NotifyTargetUser already exists for UserHospital ID: " + id);
    }
}