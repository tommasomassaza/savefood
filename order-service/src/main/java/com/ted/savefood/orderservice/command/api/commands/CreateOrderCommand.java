package com.ted.savefood.orderservice.command.api.commands;

import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
public class CreateOrderCommand {
    @TargetAggregateIdentifier
    private String orderId;
    private String boxId;
    private String boxName;
    private String userId;
    private String userName;
    private String shopId;
    private int quantity;
    private float price;
    private String pickUpTime;
}
