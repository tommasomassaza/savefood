package com.ted.savefood.paymentservice.command.api.aggregate;

import com.ted.savefood.commonfunctionality.commands.CancelPaymentCommand;
import com.ted.savefood.commonfunctionality.commands.ValidatePaymentCommand;
import com.ted.savefood.commonfunctionality.events.CancelOrderEvent;
import com.ted.savefood.commonfunctionality.events.CancelPaymentEvent;
import com.ted.savefood.commonfunctionality.events.PaymentProcessedEvent;
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
        CancelPaymentEvent cancelPaymentEvent
                = new CancelPaymentEvent();

        BeanUtils.copyProperties(cancelPaymentCommand,cancelPaymentEvent);

        AggregateLifecycle.apply(cancelPaymentEvent);
    }

    @EventSourcingHandler
    public void on(CancelPaymentEvent cancelPaymentEvent){
        this.paymentStatus=cancelPaymentEvent.getPaymentStatus();
    }
}
