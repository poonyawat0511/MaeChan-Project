package com.example.workflow.service;

import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.repository.NotifyTargetUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotifyTargetUserService {

    @Autowired
    private NotifyTargetUserRepository notifyTargetUserRepository;

    public List<NotifyTargetUser> getAllNotifyTargetUsers() {
        return notifyTargetUserRepository.findAll();
    }

    public NotifyTargetUser getNotifyTargetUserById(Long id) {
        return notifyTargetUserRepository.findById(id).orElseThrow(() -> new RuntimeException("NotifyTargetUser not found"));
    }

    public NotifyTargetUser createNotifyTargetUser(NotifyTargetUser notifyTargetUser) {
        return notifyTargetUserRepository.save(notifyTargetUser);
    }

    public NotifyTargetUser updateNotifyTargetUser(Long id, NotifyTargetUser notifyTargetUserDetails) {
        NotifyTargetUser existingNotifyTargetUser = notifyTargetUserRepository.findById(id).orElseThrow(() -> new RuntimeException("NotifyTargetUser not found"));
        notifyTargetUserDetails.setId(existingNotifyTargetUser.getId());
        return notifyTargetUserRepository.save(notifyTargetUserDetails);
    }

    public void deleteNotifyTargetUser(Long id) {
        notifyTargetUserRepository.deleteById(id);
    }
}
