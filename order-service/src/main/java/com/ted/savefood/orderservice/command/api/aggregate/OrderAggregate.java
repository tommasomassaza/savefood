package com.ted.savefood.orderservice.command.api.aggregate;

import com.ted.savefood.orderservice.command.api.commands.CancelOrderCommand;
import com.ted.savefood.orderservice.command.api.commands.CompleteOrderCommand;
import com.ted.savefood.orderservice.command.api.commands.CreateOrderCommand;
import com.ted.savefood.orderservice.command.api.events.OrderCancelledEvent;
import com.ted.savefood.orderservice.command.api.events.OrderCompletedEvent;
import com.ted.savefood.orderservice.command.api.events.OrderCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class OrderAggregate {
    @AggregateIdentifier
    private String orderId;


    public OrderAggregate(){}
    @CommandHandler
    public OrderAggregate(CreateOrderCommand createOrderCommand){
        //eventualmente validare il comando
        OrderCreatedEvent orderCreatedEvent = new OrderCreatedEvent();
        BeanUtils.copyProperties(createOrderCommand,orderCreatedEvent);
        AggregateLifecycle.apply(orderCreatedEvent);
    }

    @EventSourcingHandler
    public void on(OrderCreatedEvent orderCreatedEvent){
        this.orderId=orderCreatedEvent.getOrderId();
    }

    @CommandHandler
    public void handle(CompleteOrderCommand completeOrderCommand){
        // Validate the command
        // Publish order completed event
        OrderCompletedEvent orderCompletedEvent
                = OrderCompletedEvent.builder()
                .orderId(completeOrderCommand.getOrderId())
                .build();
        AggregateLifecycle.apply(orderCompletedEvent);
    }

    @CommandHandler
    public void handle(CancelOrderCommand cancelOrderCommand){
        OrderCancelledEvent orderCancelledEvent
                = new OrderCancelledEvent();
        BeanUtils.copyProperties(cancelOrderCommand, orderCancelledEvent);

        AggregateLifecycle.apply(orderCancelledEvent);
    }
}
