package com.example.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workflow.exception.notifyTime.NotifyTimeAlreadyExistsException;
import com.example.workflow.exception.notifyTime.NotifyTimeNotFoundException;
import com.example.workflow.model.NotifyTime;
import com.example.workflow.repository.NotifyTimeRepository;

@Service
public class NotifyTimeService {

    @Autowired
    private NotifyTimeRepository notifyTimeRepository;

    public NotifyTime createTime(NotifyTime notifyTime) {
        Optional<NotifyTime> existing = notifyTimeRepository.findByTime(notifyTime.getTime());
        if (existing.isPresent()) {
            throw new NotifyTimeAlreadyExistsException(notifyTime.getTime());
        }
        return notifyTimeRepository.save(notifyTime);
    }

    public List<NotifyTime> getAllTimes() {
        return notifyTimeRepository.findAll();
    }

    public NotifyTime getTimeById(Long id) {
        return notifyTimeRepository.findById(id)
                .orElseThrow(() -> new NotifyTimeNotFoundException(id));
    }

    public NotifyTime updateTime(Long id, NotifyTime notifyTime) {
        if (!notifyTimeRepository.existsById(id)) {
            throw new NotifyTimeNotFoundException(id);
        }

        Optional<NotifyTime> duplicate = notifyTimeRepository.findByTime(notifyTime.getTime());
        if (duplicate.isPresent() && !duplicate.get().getId().equals(id)) {
            throw new NotifyTimeAlreadyExistsException(notifyTime.getTime());
        }

        notifyTime.setId(id);
        return notifyTimeRepository.save(notifyTime);
    }

    public void deleteTime(Long id) {
        if (!notifyTimeRepository.existsById(id)) {
            throw new NotifyTimeNotFoundException(id);
        }
        notifyTimeRepository.deleteById(id);
    }
}
