package com.ted.savefood.userservice.command.api.service;

import com.ted.savefood.userservice.command.api.events.RegistrationCompleteEvent;
import com.ted.savefood.userservice.common.model.User;
import com.ted.savefood.userservice.common.model.VerificationToken;
import com.ted.savefood.userservice.common.repository.UserRepository;
import com.ted.savefood.userservice.common.repository.VerificationTokenRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    public User registerUser(RegistrationCompleteEvent registrationCompleteEvent){
        User user = new User();
        BeanUtils.copyProperties(registrationCompleteEvent,user);

        userRepository.save(user);

        return user;
    }

    public void saveVerificationTokenForUser(String token, User user){
        VerificationToken verificationToken
                = new VerificationToken(user,token);
        verificationTokenRepository.save(verificationToken);
    }
}
