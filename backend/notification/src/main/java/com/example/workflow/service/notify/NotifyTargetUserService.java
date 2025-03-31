package com.example.workflow.service;

import com.example.workflow.model.NotifyTargetUser;
import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.NotifyTargetUserRepository;
import com.example.workflow.repository.UserHospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotifyTargetUserService {

    @Autowired
    private NotifyTargetUserRepository notifyTargetUserRepository;

    @Autowired
    private UserHospitalRepository userHospitalRepository;

    public List<NotifyTargetUser> getAllNotifyTargetUsers() {
        return notifyTargetUserRepository.findAll();
    }

    public NotifyTargetUser getNotifyTargetUserById(Long id) {
        return notifyTargetUserRepository.findById(id).orElseThrow(() -> new RuntimeException("NotifyTargetUser not found"));
    }

    public NotifyTargetUser createNotifyTargetUser(NotifyTargetUser notifyTargetUser) {
        return notifyTargetUserRepository.save(notifyTargetUser);
    }

    public NotifyTargetUser createNotifyTargetUser(Long userHospitalId) {
        UserHospital userHospital = userHospitalRepository.findById(userHospitalId)
                .orElseThrow(() -> new RuntimeException("UserHospital not found"));

        NotifyTargetUser notifyTargetUser = new NotifyTargetUser();
        notifyTargetUser.setTargetUser(userHospital);

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
