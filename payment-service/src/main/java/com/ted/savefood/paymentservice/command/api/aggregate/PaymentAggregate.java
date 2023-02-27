package com.ted.savefood.paymentservice.command.api.aggregate;

import com.ted.savefood.commonutils.commands.CancelPaymentCommand;
import com.ted.savefood.commonutils.commands.ValidatePaymentCommand;
import com.ted.savefood.commonutils.events.PaymentCancelledEvent;
import com.ted.savefood.commonutils.events.PaymentProcessedEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
@Slf4j
public class PaymentAggregate {
    @AggregateIdentifier
    private String paymentId;
    private String orderId;
    private String paymentStatus;

    public PaymentAggregate(){}

    public PaymentAggregate(ValidatePaymentCommand validatePaymentCommand){
        //Validate payment details
        //Publish the payment Processed event
        log.info("Executing ValidatePaymentCommand for " +
                "Order Id: {} and Payment Id: {}", validatePaymentCommand.getOrderId(), validatePaymentCommand.getPaymentId());

        PaymentProcessedEvent paymentProcessedEvent
                = new PaymentProcessedEvent(
                validatePaymentCommand.getPaymentId(), validatePaymentCommand.getOrderId()
        );

        AggregateLifecycle.apply(paymentProcessedEvent);

        log.info("PaymentProcessedEvent Applied");
    }

    @EventSourcingHandler
    public void on(PaymentProcessedEvent paymentProcessedEvent){
        this.paymentId=paymentProcessedEvent.getPaymentId();
        this.orderId=paymentProcessedEvent.getOrderId();
    }

    @CommandHandler
    public void handle(CancelPaymentCommand cancelPaymentCommand){
        PaymentCancelledEvent paymentCancelledEvent
                = new PaymentCancelledEvent();

        BeanUtils.copyProperties(cancelPaymentCommand,paymentCancelledEvent);

        AggregateLifecycle.apply(paymentCancelledEvent);
    }

    @EventSourcingHandler
    public void on(PaymentCancelledEvent paymentCancelledEvent){
        this.paymentStatus=paymentCancelledEvent.getPaymentStatus();
    }
}
