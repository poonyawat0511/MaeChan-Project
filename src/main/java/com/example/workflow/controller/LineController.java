package com.example.workflow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LineController {

    @GetMapping("/user")
    String lineListUserId() {
        return "user";
    }

}
