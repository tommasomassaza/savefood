package com.ted.savefood.orderservice.command.api.saga;

import com.ted.savefood.commonfunctionality.commands.*;
import com.ted.savefood.commonfunctionality.events.*;
import com.ted.savefood.commonfunctionality.model.CardDetails;
import com.ted.savefood.commonfunctionality.query.GetUserPaymentDetailsQuery;
import com.ted.savefood.orderservice.command.api.events.CreateOrderEvent;
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
    private void handle(CreateOrderEvent createOrderEvent){
        log.info("CreateOrderEvent in Saga for Order Id : {}", createOrderEvent.getOrderId());

        GetUserPaymentDetailsQuery getUserPaymentDetailsQuery = new GetUserPaymentDetailsQuery(createOrderEvent.getCustomerId());

        CardDetails cardDetails = null;
        try {
            cardDetails = queryGateway.query(
                    getUserPaymentDetailsQuery,
                    ResponseTypes.instanceOf(CardDetails.class)
            ).join();

            ValidatePaymentCommand validatePaymentCommand = ValidatePaymentCommand.builder()
                    .cardDetails(cardDetails)
                    .orderId(createOrderEvent.getOrderId())
                    .paymentId(UUID.randomUUID().toString())
                    .build();

            commandGateway.send(validatePaymentCommand);

        } catch (Exception e){
            log.error(e.getMessage());

            // Start the compensating transaction
            cancelOrderCommand(createOrderEvent.getOrderId());
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
            ReservationOrderCommand reservationOrderCommand
                    = ReservationOrderCommand.builder()
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
    public void handle(ReservationOrderEvent reservationOrderEvent){
        log.info("ReservationOrderEvent in Saga for Order Id : {}", reservationOrderEvent.getOrderId());

        CompleteOrderCommand completeOrderCommand
                = CompleteOrderCommand.builder()
                .orderId(reservationOrderEvent.getOrderId())
                .orderStatus("APPROVED")
                .build();

        commandGateway.sendAndWait(completeOrderCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(CompleteOrderEvent completeOrderEvent){
        log.info("CompleteOrderEvent in Saga for Order Id : {}", completeOrderEvent.getOrderId());
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(CancelOrderEvent cancelOrderEvent){
        log.info("CancelOrderEvent in Saga for Order Id : {}", cancelOrderEvent.getOrderId());
    }

    @SagaEventHandler(associationProperty = "orderId")
    public void handle(CancelPaymentEvent cancelPaymentEvent){
        log.info("CancelOrderEvent in Saga for Order Id : {}", cancelPaymentEvent.getOrderId());

        cancelOrderCommand(cancelPaymentEvent.getOrderId());
    }
}
