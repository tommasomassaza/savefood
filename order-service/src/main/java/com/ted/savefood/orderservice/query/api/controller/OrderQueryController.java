package com.ted.savefood.orderservice.query.api.controller;

import com.ted.savefood.orderservice.common.modelDto.OrderDto;
import com.ted.savefood.orderservice.query.api.queries.GetOrdersByShopIds;
import com.ted.savefood.orderservice.query.api.queries.GetOrdersQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderQueryController {

    private final QueryGateway queryGateway;

    public OrderQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping("/getByUserId/{userId}")
    public List<OrderDto> getAllOrders(@PathVariable String userId) {
        GetOrdersQuery getOrdersQuery = new GetOrdersQuery(userId);

        return queryGateway.query(
                        getOrdersQuery,
                        ResponseTypes.multipleInstancesOf(OrderDto.class))
                .join();
    }

    @GetMapping("/getByShopIds/{shopIds}")
    public List<OrderDto> getOrdersByShopId(@PathVariable List<String> shopIds) {
        GetOrdersByShopIds getOrdersByShopIds = new GetOrdersByShopIds(shopIds);

        return queryGateway.query(
                        getOrdersByShopIds,
                        ResponseTypes.multipleInstancesOf(OrderDto.class))
                .join();
    }
}
