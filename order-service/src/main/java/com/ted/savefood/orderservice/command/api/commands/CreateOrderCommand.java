package com.ted.savefood.orderservice.command.api.commands;

import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
public class CreateOrderCommand {
    @TargetAggregateIdentifier
    private String orderId;
    private String boxId;
    private String userId;
    private int quantity;
    private String orderStatus;
}
