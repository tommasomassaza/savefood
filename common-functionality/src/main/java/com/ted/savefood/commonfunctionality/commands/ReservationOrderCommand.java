package com.ted.savefood.commonfunctionality.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class ReservationOrderCommand {
    @TargetAggregateIdentifier
    private String reservationId;
    private String orderId;
}
