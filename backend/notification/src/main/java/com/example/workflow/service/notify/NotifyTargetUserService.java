package com.example.workflow.service.notify;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.exception.notifyTargetUser.NotifyTargetUserAlreadyExistsException;
import com.example.workflow.exception.notifyTargetUser.NotifyTargetUserNotFoundException;
import com.example.workflow.exception.userHospital.UserHospitalNotFoundException;
import com.example.workflow.model.UserHospital;
import com.example.workflow.model.notify.NotifyTargetUser;
import com.example.workflow.repository.UserHospitalRepository;
import com.example.workflow.repository.notify.NotifyTargetUserRepository;

@Service
public class NotifyTargetUserService {

    @Autowired
    private NotifyTargetUserRepository notifyTargetUserRepository;

    @Autowired
    private UserHospitalRepository userHospitalRepository;

    public NotifyTargetUser createNotifyTargetUser(Long userHospitalId) {
        UserHospital userHospital = userHospitalRepository.findById(userHospitalId)
                .orElseThrow(() -> new UserHospitalNotFoundException(userHospitalId));

        boolean exists = notifyTargetUserRepository.existsByTargetUser(userHospital);
        if (exists) {
            throw new NotifyTargetUserAlreadyExistsException(userHospital.getId());
        }

        NotifyTargetUser notifyTargetUser = new NotifyTargetUser();
        notifyTargetUser.setTargetUser(userHospital);

        return notifyTargetUserRepository.save(notifyTargetUser);
    }

    public List<NotifyTargetUser> getAllNotifyTargetUsers() {
        return notifyTargetUserRepository.findAll();
    }

    public NotifyTargetUser getNotifyTargetUserById(Long id) {
        return notifyTargetUserRepository.findById(id)
                .orElseThrow(() -> new NotifyTargetUserNotFoundException(id));
    }

    public NotifyTargetUser updateNotifyTargetUser(Long id, NotifyTargetUser notifyTargetUser) {
        // ตรวจสอบว่า NotifyTargetUser เดิมมีอยู่
        NotifyTargetUser existing = notifyTargetUserRepository.findById(id)
                .orElseThrow(() -> new NotifyTargetUserNotFoundException(id));
    
        // ดึง UserHospital จาก notifyTargetUser ที่ส่งมา
        UserHospital newTarget = userHospitalRepository.findById(notifyTargetUser.getTargetUser().getId())
                .orElseThrow(() -> new UserHospitalNotFoundException(notifyTargetUser.getTargetUser().getId()));
    
        // ✅ ตรวจสอบว่า UserHospital คนนี้ถูกใช้เป็น target แล้วหรือยัง (แต่ไม่ใช่ของ record นี้เอง)
        boolean duplicate = notifyTargetUserRepository.existsByTargetUser(newTarget);
        if (duplicate && !existing.getTargetUser().getId().equals(newTarget.getId())) {
            throw new NotifyTargetUserAlreadyExistsException(newTarget.getId());
        }
    
        // ตั้งค่าใหม่
        existing.setTargetUser(newTarget);
        return notifyTargetUserRepository.save(existing);
    }
    

    public void deleteNotifyTargetUser(Long id) {
        if (!notifyTargetUserRepository.existsById(id)) {
            throw new NotifyTargetUserNotFoundException(id);
        }
        notifyTargetUserRepository.deleteById(id);
    }
}
