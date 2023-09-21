package com.ted.savefood.orderservice.query.api.queries;

import lombok.Value;

import java.util.List;

@Value
public class GetOrdersByShopIds {
    private List<String> shopIds;
}
