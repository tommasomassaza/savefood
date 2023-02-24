package com.ted.savefood.paymentservice.aggregate;

import com.ted.savefood.commonfunctionality.commands.ValidatePaymentCommand;
import com.ted.savefood.commonfunctionality.events.PaymentProcessedEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

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
                "Order Id: {} and Paymnet Id: {}", validatePaymentCommand.getOrderId(), validatePaymentCommand.getPaymentId());

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
}
