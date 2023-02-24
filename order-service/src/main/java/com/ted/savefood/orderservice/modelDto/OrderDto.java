package com.ted.savefood.orderservice.modelDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private String boxId;
    private String customerId;
    private int quantity;
}
