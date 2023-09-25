package com.ted.savefood.orderservice.command.api.saga;

import com.ted.savefood.commonutils.commands.ModifyQuantityBoxCommand;
import com.ted.savefood.commonutils.events.BoxQuantityModifiedEvent;
import com.ted.savefood.orderservice.command.api.commands.CancelOrderCommand;
import com.ted.savefood.orderservice.command.api.commands.CompleteOrderCommand;
import com.ted.savefood.orderservice.command.api.events.OrderCancelledEvent;
import com.ted.savefood.orderservice.command.api.events.OrderCompletedEvent;
import com.ted.savefood.orderservice.command.api.events.OrderCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;

@Saga
@Slf4j
public class OrderProcessingSaga {
    @Autowired
    private transient CommandGateway commandGateway;

    private final ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> sagaTimeout;

    public OrderProcessingSaga() {
    }
    @StartSaga
    @SagaEventHandler(associationProperty = "orderId")
    private void handle(OrderCreatedEvent orderCreatedEvent) {
        log.info("OrderCreatedEvent in Saga for Order Id : {}", orderCreatedEvent.getOrderId());

        try {
            ModifyQuantityBoxCommand modifyQuantityBoxCommand =
                    ModifyQuantityBoxCommand.builder()
                            .orderId(orderCreatedEvent.getOrderId())
                            .boxId(orderCreatedEvent.getBoxId())
                            .quantity(orderCreatedEvent.getQuantity())
                            .build();
            commandGateway.send(modifyQuantityBoxCommand);

        } catch (Exception e) {
            log.error("Ciaooo0903894732598   " + e.getMessage());

            // Start the compensating transaction
            cancelOrderCommand(orderCreatedEvent.getOrderId());
        }
    }

    private void cancelOrderCommand(String orderId) {
        CancelOrderCommand cancelOrderCommand = new CancelOrderCommand(orderId);
        commandGateway.send(cancelOrderCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    public void handle(BoxQuantityModifiedEvent boxQuantityModifiedEvent) {
        log.info("BoxQuantityModifiedEvent in Saga for Order Id : {}", boxQuantityModifiedEvent.getOrderId());

        CompleteOrderCommand completeOrderCommand
                = CompleteOrderCommand.builder()
                .orderId(boxQuantityModifiedEvent.getOrderId())
                .build();

        commandGateway.sendAndWait(completeOrderCommand);
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(OrderCompletedEvent orderCompletedEvent) {
        log.info("CompleteOrderEvent in Saga for Order Id : {}", orderCompletedEvent.getOrderId());
    }

    @SagaEventHandler(associationProperty = "orderId")
    @EndSaga
    public void handle(OrderCancelledEvent orderCancelledEvent) {
        log.info("CancelOrderEvent in Saga for Order Id : {}", orderCancelledEvent.getOrderId());
    }
}
