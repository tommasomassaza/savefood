package com.ted.savefood.orderservice.command.api.events;

import lombok.Data;

@Data
public class CreateOrderEvent {
    private String orderId;
    private String boxId;
    private String customerId;
    private int quantity;
    private String orderStatus;
}
