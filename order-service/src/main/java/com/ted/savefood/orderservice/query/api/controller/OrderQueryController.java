package com.ted.savefood.orderservice.query.api.controller;

import com.ted.savefood.orderservice.common.modelDto.OrderDto;
import com.ted.savefood.orderservice.query.api.queries.GetOrdersQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderQueryController {

    private QueryGateway queryGateway;

    public OrderQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping
    public List<OrderDto> getAllOrders() {
        GetOrdersQuery getOrdersQuery = new GetOrdersQuery();

        return queryGateway.query(
                        getOrdersQuery,
                        ResponseTypes.multipleInstancesOf(OrderDto.class))
                .join();
    }
}
