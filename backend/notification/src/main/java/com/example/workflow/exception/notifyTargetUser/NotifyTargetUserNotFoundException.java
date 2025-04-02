package com.example.workflow.exception.notifyTargetUser;

public class NotifyTargetUserNotFoundException extends RuntimeException {
    public NotifyTargetUserNotFoundException(Long id) {
        super("NotifyTargetUser not found with id: " + id);
    }
}
