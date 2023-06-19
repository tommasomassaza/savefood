package com.ted.savefood.userservice.command.api.controller;

import com.ted.savefood.userservice.command.api.commands.RegisterUserCommand;
import com.ted.savefood.userservice.common.modelDto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class RegistrationController {
    @Autowired
    private CommandGateway commandGateway;

    @PostMapping("/api/register")
    public String registerUser(@RequestBody UserDto userDto, final HttpServletRequest request) {
        String userId = UUID.randomUUID().toString();
        RegisterUserCommand registerUserCommand = new RegisterUserCommand();

        registerUserCommand.setUserId(userId);
        registerUserCommand.setEmail(userDto.getEmail());
        registerUserCommand.setRole(userDto.getRole());

        String ret = commandGateway.sendAndWait(registerUserCommand);

        return ret;
    }
}
