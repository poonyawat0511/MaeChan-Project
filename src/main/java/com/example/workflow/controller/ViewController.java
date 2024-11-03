package com.example.workflow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/user")
    String lineListUserId() {
        return "user";
    }

}
