package com.ted.savefood.orderservice.common.modelDto;

import lombok.Data;

@Data
public class OrderDto {
    private String boxId;
    private String customerId;
    private int quantity;
}
