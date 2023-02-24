package com.ted.savefood.orderservice.aggregate;

import com.ted.savefood.commonfunctionality.commands.CompleteOrderCommand;
import com.ted.savefood.commonfunctionality.events.CompleteOrderEvent;
import com.ted.savefood.orderservice.command.CreateOrderCommand;
import com.ted.savefood.orderservice.events.CreateOrderEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class OrderAggregate {
    @AggregateIdentifier
    private String orderId;
    private String boxId;
    private String customerId;
    private int quantity;
    private String orderStatus;


    public OrderAggregate(){}
    @CommandHandler
    public OrderAggregate(CreateOrderCommand createOrderCommand){
        //eventualmente validare il comando
        CreateOrderEvent createOrderEvent = new CreateOrderEvent();
        BeanUtils.copyProperties(createOrderCommand,createOrderEvent);
        AggregateLifecycle.apply(createOrderEvent);
    }

    @EventSourcingHandler
    public void on(CreateOrderEvent createOrderEvent){
        this.orderId=createOrderEvent.getOrderId();
        this.boxId=createOrderEvent.getBoxId();
        this.customerId=createOrderEvent.getCustomerId();
        this.quantity=createOrderEvent.getQuantity();
        this.orderStatus=createOrderEvent.getOrderStatus();
    }

    @EventHandler
    public void handle(CompleteOrderCommand completeOrderCommand){
        // Validate the command
        // Publish order completed event
        CompleteOrderEvent completeOrderEvent
                = CompleteOrderEvent.builder()
                .orderId(completeOrderCommand.getOrderId())
                .orderStatus(completeOrderCommand.getOrderStatus())
                .build();
        AggregateLifecycle.apply(completeOrderEvent);
    }

    @EventSourcingHandler
    public void on(CompleteOrderEvent completeOrderEvent){
        this.orderStatus=completeOrderEvent.getOrderStatus();
    }
}
