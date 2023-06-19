package com.ted.savefood.userservice.command.api.commands;

import lombok.Data;

@Data
public class RegisterUserCommand {
    private String userId;
    private String email;
    private String role;
}
