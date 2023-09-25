package com.ted.savefood.boxservice.command.api.aggregate;

import com.ted.savefood.boxservice.command.api.commands.CancelBoxCommand;
import com.ted.savefood.boxservice.command.api.commands.CreateBoxCommand;
import com.ted.savefood.boxservice.command.api.commands.ModifyBoxCommand;
import com.ted.savefood.boxservice.command.api.events.BoxCancelledEvent;
import com.ted.savefood.boxservice.command.api.events.BoxCreatedEvent;
import com.ted.savefood.boxservice.command.api.events.BoxModifiedEvent;
import com.ted.savefood.commonutils.commands.ModifyQuantityBoxCommand;
import com.ted.savefood.commonutils.events.BoxQuantityModifiedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateCreationPolicy;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.CreationPolicy;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class BoxAggregate {
    @AggregateIdentifier
    private String boxId;
    public BoxAggregate() {}

    @CommandHandler
    public BoxAggregate(CreateBoxCommand createBoxCommand){
        BoxCreatedEvent boxCreatedEvent = new BoxCreatedEvent();
        BeanUtils.copyProperties(createBoxCommand,boxCreatedEvent);

        AggregateLifecycle.apply(boxCreatedEvent);
    }

    @EventSourcingHandler
    public void on(BoxCreatedEvent boxCreatedEvent){
        this.boxId = boxCreatedEvent.getBoxId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(ModifyBoxCommand modifyBoxCommand) {
        BoxModifiedEvent boxModifiedEvent = new BoxModifiedEvent();
        BeanUtils.copyProperties(modifyBoxCommand, boxModifiedEvent);

        AggregateLifecycle.apply(boxModifiedEvent);
    }

    @EventSourcingHandler
    public void on(BoxModifiedEvent boxModifiedEvent) {
        this.boxId = boxModifiedEvent.getBoxId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(ModifyQuantityBoxCommand modifyQuantityBoxCommand) throws Exception {
        BoxQuantityModifiedEvent boxQuantityModifiedEvent = new BoxQuantityModifiedEvent();
        BeanUtils.copyProperties(modifyQuantityBoxCommand, boxQuantityModifiedEvent);
        AggregateLifecycle.apply(boxQuantityModifiedEvent);
    }

    @EventSourcingHandler
    public void on(BoxQuantityModifiedEvent boxQuantityModifiedEvent) {
        this.boxId = boxQuantityModifiedEvent.getBoxId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(CancelBoxCommand cancelBoxCommand){
        BoxCancelledEvent boxCancelledEvent
                = new BoxCancelledEvent();
        BeanUtils.copyProperties(cancelBoxCommand, boxCancelledEvent);

        AggregateLifecycle.apply(boxCancelledEvent);
    }

    @EventSourcingHandler
    public void on(BoxCancelledEvent boxCancelledEvent) {
        this.boxId = boxCancelledEvent.getBoxId();
    }
}
