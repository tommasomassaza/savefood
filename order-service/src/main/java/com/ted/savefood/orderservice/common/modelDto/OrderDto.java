package com.ted.savefood.orderservice.common.modelDto;

import lombok.Data;

@Data
public class OrderDto {
    private String orderId;
    private String boxId;
    private String boxName;
    private String userId;
    private String name;
    private int quantity;
    private float price;
    private String pickUpTime;
}
