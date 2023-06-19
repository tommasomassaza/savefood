package com.ted.savefood.userservice.command.api.eventHandler;

import com.ted.savefood.userservice.command.api.events.RegistrationCompleteEvent;
import com.ted.savefood.userservice.common.model.User;
import com.ted.savefood.userservice.common.repository.UserRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserEventHandler {

    private final UserRepository userRepository;

    public UserEventHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @EventHandler
    public void on(RegistrationCompleteEvent registrationCompleteEvent) {
        // save user
        User user = new User();
        BeanUtils.copyProperties(registrationCompleteEvent, user);

        userRepository.save(user);
    }
}
