package com.ted.savefood.reservationservice.command.api.aggregate;

import com.ted.savefood.commonutils.commands.ReserveOrderCommand;
import com.ted.savefood.commonutils.events.OrderReservedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
public class ReservationAggregate {
    @AggregateIdentifier
    private String reservationId;
    private String orderId;
    private String reservationStatus;

    public ReservationAggregate(){}

    @CommandHandler
    public ReservationAggregate(ReserveOrderCommand reservationOrderCommand){
        // Validate the command
        // Publish the order Reservation Event
        OrderReservedEvent orderReservedEvent
                = OrderReservedEvent.builder()
                .reservationId(reservationOrderCommand.getReservationId())
                .orderId(reservationOrderCommand.getOrderId())
                .reservationStatus("COMPLETED")
                .build();

        AggregateLifecycle.apply(orderReservedEvent);
    }

    @EventSourcingHandler
    public void on(OrderReservedEvent reservationOrderEvent){
        this.reservationId=reservationOrderEvent.getReservationId();
        this.orderId=reservationOrderEvent.getOrderId();
        this.reservationStatus=reservationOrderEvent.getReservationStatus();
    }
}
