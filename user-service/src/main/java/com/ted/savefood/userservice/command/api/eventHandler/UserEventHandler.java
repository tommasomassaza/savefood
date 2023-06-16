package com.ted.savefood.userservice.command.api.eventHandler;

import com.ted.savefood.userservice.command.api.events.RegistrationCompleteEvent;
import com.ted.savefood.userservice.command.api.service.UserService;
import com.ted.savefood.userservice.common.model.User;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class UserEventHandler {

    @Autowired
    private UserService userService;

    @EventHandler
    public void on(RegistrationCompleteEvent registrationCompleteEvent){
        // save user
        User user = userService.registerUser(registrationCompleteEvent);

        // create the verfcaton toen for the user wth lng
        String token = UUID.randomUUID().toString();
        userService.saveVerificationTokenForUser(token,user);

        // send mal to user
        String url
                = registrationCompleteEvent.getApplicationUrl()
                + "verifyRegistration?token="
                + token;

        //sendVerificationEmail()
        log.info("Click the link to verify your account: {}", url);
    }
}
