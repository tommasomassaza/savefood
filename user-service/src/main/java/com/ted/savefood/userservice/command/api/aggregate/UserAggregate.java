package com.ted.savefood.userservice.command.api.aggregate;

import com.ted.savefood.userservice.command.api.commands.RegisterUserCommand;
import com.ted.savefood.userservice.command.api.events.RegistrationCompleteEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.springframework.beans.BeanUtils;

public class UserAggregate {
    private String userId;
    private String email;
    private String password;
    private String role;
    private boolean enabled;
    private String applicationUrl;

    public UserAggregate(){}
    @CommandHandler
    public UserAggregate(RegisterUserCommand registerUserCommand){
        //eventualmente validare il comando
        RegistrationCompleteEvent userRegisteredEvent = new RegistrationCompleteEvent();
        BeanUtils.copyProperties(registerUserCommand,userRegisteredEvent);
        AggregateLifecycle.apply(userRegisteredEvent);
    }

    @EventSourcingHandler
    public void on(RegistrationCompleteEvent userRegisteredEvent){
        this.userId=userRegisteredEvent.getUserId();
        this.email=userRegisteredEvent.getEmail();
        this.password=userRegisteredEvent.getPassword();
        this.role=userRegisteredEvent.getRole();
        this.enabled=userRegisteredEvent.isEnabled();
        this.applicationUrl=userRegisteredEvent.getApplicationUrl();
    }
}
