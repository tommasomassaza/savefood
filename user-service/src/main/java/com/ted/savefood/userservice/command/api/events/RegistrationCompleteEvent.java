package com.ted.savefood.userservice.command.api.events;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RegistrationCompleteEvent {
    private String userId;
    private String email;
    private String password;
    private String role;
    private boolean enabled;

    private String applicationUrl;
}
