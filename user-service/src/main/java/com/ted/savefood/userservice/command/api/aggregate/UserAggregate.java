package com.ted.savefood.userservice.command.api.aggregate;

import com.ted.savefood.userservice.command.api.commands.RegisterUserCommand;
import com.ted.savefood.userservice.command.api.events.RegistrationCompleteEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;


@Aggregate
public class UserAggregate {

    @AggregateIdentifier
    private String userId;
    private String email;
    private String role;

    public UserAggregate() {
    }

    @CommandHandler
    public UserAggregate(RegisterUserCommand registerUserCommand) {
        //eventualmente validare il comando
        RegistrationCompleteEvent userRegisteredEvent = new RegistrationCompleteEvent();
        BeanUtils.copyProperties(registerUserCommand, userRegisteredEvent);
        AggregateLifecycle.apply(userRegisteredEvent);
    }

    @EventSourcingHandler
    public void on(RegistrationCompleteEvent registrationCompleteEvent) {
        this.userId = registrationCompleteEvent.getUserId();
        this.email = registrationCompleteEvent.getEmail();
        this.role = registrationCompleteEvent.getRole();
    }
}
