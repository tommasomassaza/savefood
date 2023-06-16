package com.ted.savefood.userservice.command.api.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class HelloController {
    @GetMapping("/hello")
    public String hello(){
        return "Hello, Welcome to Daily Code Buffer!";
    }
}
