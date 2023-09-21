package com.ted.savefood.commonutils.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class ReserveOrderCommand {
    @TargetAggregateIdentifier
    private String reservationId;
    private String orderId;
}
