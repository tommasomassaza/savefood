package com.ted.savefood.orderservice.command.api.events;

import lombok.Data;

@Data
public class OrderCreatedEvent {
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
