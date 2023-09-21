package com.ted.savefood.orderservice.common.modelDto;

import lombok.Data;

@Data
public class OrderDto {
    private String orderId;
    private String boxName;
    private String userId;
    private String userName;
    private String shopId;
    private int quantity;
    private float price;
    private String pickUpTime;
}
