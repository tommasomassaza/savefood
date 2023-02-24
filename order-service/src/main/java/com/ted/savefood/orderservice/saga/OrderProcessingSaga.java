package com.ted.savefood.orderservice.saga;

import com.ted.savefood.commonfunctionality.commands.CompleteOrderCommand;
import com.ted.savefood.commonfunctionality.commands.ReservationOrderCommand;
import com.ted.savefood.commonfunctionality.commands.ValidatePaymentCommand;
import com.ted.savefood.commonfunctionality.events.CompleteOrderEvent;
import com.ted.savefood.commonfunctionality.events.PaymentProcessedEvent;
import com.ted.savefood.commonfunctionality.events.ReservationOrderEvent;
import com.ted.savefood.commonfunctionality.model.CardDetails;
import com.ted.savefood.commonfunctionality.query.GetUserPaymentDetailsQuery;
import com.ted.savefood.orderservice.events.CreateOrderEvent;
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
        } catch (Exception e){
            log.error(e.getMessage());
            // Start the compensatng transacton
        }

        ValidatePaymentCommand validatePaymentCommand = ValidatePaymentCommand.builder()
                .cardDetails(cardDetails)
                .orderId(createOrderEvent.getOrderId())
                .paymentId(UUID.randomUUID().toString())
                .build();

        commandGateway.sendAndWait(validatePaymentCommand);
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
            commandGateway.sendAndWait(reservationOrderCommand);
        } catch (Exception e){
            log.info(e.getMessage());
            // Start the compensating transaction
        }
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
}
