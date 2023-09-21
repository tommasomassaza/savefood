package com.ted.savefood.orderservice.query.api.projection;

import com.ted.savefood.orderservice.common.model.Order;
import com.ted.savefood.orderservice.common.modelDto.OrderDto;
import com.ted.savefood.orderservice.common.repository.OrderRepository;
import com.ted.savefood.orderservice.query.api.queries.GetOrdersByShopIds;
import com.ted.savefood.orderservice.query.api.queries.GetOrdersQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderProjection {
    private final OrderRepository orderRepository;

    public OrderProjection(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @QueryHandler
    public List<OrderDto> handle(GetOrdersQuery getOrdersQuery) {
        List<Order> orders = new LinkedList<>();
        orderRepository.findByUserId(getOrdersQuery.getUserId()).forEach(orders::add);

        return orders.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @QueryHandler
    public List<OrderDto> handle(GetOrdersByShopIds getOrdersByShopIds) {
        List<Order> orders = new LinkedList<>();
        orderRepository.findByShopIdIn(getOrdersByShopIds.getShopIds()).forEach(orders::add);

        return orders.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


    private OrderDto toDto(Order order) {
        OrderDto orderDto = new OrderDto();
        BeanUtils.copyProperties(order, orderDto);

        return orderDto;
    }
}
