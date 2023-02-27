package com.ted.savefood.orderservice.command.api.saga;

import com.ted.savefood.commonutils.commands.*;
import com.ted.savefood.commonutils.events.*;
import com.ted.savefood.commonutils.model.CardDetails;
import com.ted.savefood.commonutils.query.GetUserPaymentDetailsQuery;
import com.ted.savefood.orderservice.command.api.events.OrderCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Saga
@Slf4j
public class OrderProcessingSaga {

    @Autowired
    private transient CommandGateway commandGateway;
    @Autowired
    private transient QueryGateway queryGateway;

    public OrderProcessingSaga(){}

    @StartSaga
    @SagaEventHandler(associationProperty = "orderId")
    private void handle(OrderCreatedEvent orderCreatedEvent){
        log.info("CreateOrderEvent in Saga for Order Id : {}", orderCreatedEvent.getOrderId());

        GetUserPaymentDetailsQuery getUserPaymentDetailsQuery = new GetUserPaymentDetailsQuery(orderCreatedEvent.getCustomerId());

        CardDetails cardDetails = null;
        try {
            cardDetails = queryGateway.query(
                    getUserPaymentDetailsQuery,
                    ResponseTypes.instanceOf(CardDetails.class)
            ).join();

            ValidatePaymentCommand validatePaymentCommand = ValidatePaymentCommand.builder()
                    .cardDetails(cardDetails)
                    .orderId(orderCreatedEvent.getOrderId())
                    .paymentId(UUID.randomUUID().toString())
                    .build();

            commandGateway.send(validatePaymentCommand);

        } catch (Exception e){
            log.error(e.getMessage());

            // Start the compensating transaction
            cancelOrderCommand(orderCreatedEvent.getOrderId());
        }
    }

    private void cancelOrderCommand(String orderId) {
        CancelOrderCommand cancelOrderCommand = new CancelOrderCommand(orderId);
        commandGateway.send(cancelOrderCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    private void handle(PaymentProcessedEvent paymentProcessedEvent){
        log.info("PaymentProcessedEvent in Saga for Order Id : {}", paymentProcessedEvent.getOrderId());

        try {
            ReserveOrderCommand reservationOrderCommand
                    = ReserveOrderCommand.builder()
                    .reservationId(UUID.randomUUID().toString())
                    .orderId(paymentProcessedEvent.getOrderId())
                    .build();
            commandGateway.send(reservationOrderCommand);
        } catch (Exception e){
            log.info(e.getMessage());
            // Start the compensating transaction

            cancelPaymentCommand(paymentProcessedEvent);
        }
    }

    private void cancelPaymentCommand(PaymentProcessedEvent paymentProcessedEvent) {
        CancelPaymentCommand cancelPaymentCommand = new CancelPaymentCommand(paymentProcessedEvent.getPaymentId(), paymentProcessedEvent.getOrderId());
        commandGateway.send(cancelPaymentCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    public void handle(OrderReservedEvent orderReservedEvent){
        log.info("ReservationOrderEvent in Saga for Order Id : {}", orderReservedEvent.getOrderId());

        CompleteOrderCommand completeOrderCommand
                = CompleteOrderCommand.builder()
                .orderId(orderReservedEvent.getOrderId())
                .orderStatus("APPROVED")
                .build();

        commandGateway.sendAndWait(completeOrderCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(OrderCompletedEvent orderCompletedEvent){
        log.info("CompleteOrderEvent in Saga for Order Id : {}", orderCompletedEvent.getOrderId());
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(OrderCancelledEvent orderCancelledEvent){
        log.info("CancelOrderEvent in Saga for Order Id : {}", orderCancelledEvent.getOrderId());
    }

    @SagaEventHandler(associationProperty = "orderId")
    public void handle(PaymentCancelledEvent paymentCancelledEvent){
        log.info("CancelOrderEvent in Saga for Order Id : {}", paymentCancelledEvent.getOrderId());

        cancelOrderCommand(paymentCancelledEvent.getOrderId());
    }
}
