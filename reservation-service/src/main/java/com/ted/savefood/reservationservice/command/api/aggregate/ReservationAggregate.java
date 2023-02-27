package com.ted.savefood.reservationservice.command.api.aggregate;

import com.ted.savefood.commonfunctionality.commands.ReservationOrderCommand;
import com.ted.savefood.commonfunctionality.events.ReservationOrderEvent;
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
    public ReservationAggregate(ReservationOrderCommand reservationOrderCommand){
        // Validate the command
        // Publish the order Reservation Event
        ReservationOrderEvent reservationOrderEvent
                = ReservationOrderEvent.builder()
                .reservationId(reservationOrderCommand.getReservationId())
                .orderId(reservationOrderCommand.getOrderId())
                .reservationStatus("COMPLETED")
                .build();

        AggregateLifecycle.apply(reservationOrderEvent);
    }

    @EventSourcingHandler
    public void on(ReservationOrderEvent reservationOrderEvent){
        this.reservationId=reservationOrderEvent.getReservationId();
        this.orderId=reservationOrderEvent.getOrderId();
        this.reservationStatus=reservationOrderEvent.getReservationStatus();
    }
}
