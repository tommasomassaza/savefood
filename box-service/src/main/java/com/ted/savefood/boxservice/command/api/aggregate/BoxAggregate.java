package com.ted.savefood.boxservice.command.api.aggregate;

import com.ted.savefood.boxservice.command.api.commands.CreateBoxCommand;
import com.ted.savefood.boxservice.command.api.events.BoxCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class BoxAggregate {
    @AggregateIdentifier
    private String boxId;
    private String shopId;
    private String name;
    private String description;
    private int size;
    private float price;

    @CommandHandler
    public BoxAggregate(CreateBoxCommand createBoxCommand){
        BoxCreatedEvent boxCreatedEvent = new BoxCreatedEvent();
        BeanUtils.copyProperties(createBoxCommand,boxCreatedEvent);

        AggregateLifecycle.apply(boxCreatedEvent);
    }

    public BoxAggregate() {}

    @EventSourcingHandler
    public void on(BoxCreatedEvent boxCreatedEvent){
        this.boxId=boxCreatedEvent.getBoxId();
        this.shopId=boxCreatedEvent.getShopId();
        this.name=boxCreatedEvent.getName();
        this.description=boxCreatedEvent.getDescription();
        this.size=boxCreatedEvent.getSize();
        this.price= boxCreatedEvent.getPrice();
    }
}
