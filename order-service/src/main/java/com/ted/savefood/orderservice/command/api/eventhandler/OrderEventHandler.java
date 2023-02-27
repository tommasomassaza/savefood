package com.ted.savefood.orderservice.command.api.eventhandler;

import com.ted.savefood.commonutils.events.OrderCancelledEvent;
import com.ted.savefood.commonutils.events.OrderCompletedEvent;
import com.ted.savefood.orderservice.command.api.events.OrderCreatedEvent;
import com.ted.savefood.orderservice.common.model.Order;
import com.ted.savefood.orderservice.common.repository.OrderRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class OrderEventHandler {
    private OrderRepository orderRepository;

    public OrderEventHandler(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @EventHandler
    public void on(OrderCreatedEvent orderCreatedEvent){
        Order order = new Order();
        BeanUtils.copyProperties(orderCreatedEvent,order);

        orderRepository.save(order);
    }

    @EventHandler
    public void on(OrderCompletedEvent orderCompletedEvent){
        Order order = orderRepository.findById(orderCompletedEvent.getOrderId()).get();
        order.setOrderStatus(orderCompletedEvent.getOrderStatus());

        orderRepository.save(order);
    }

    @EventHandler
    public void on(OrderCancelledEvent orderCancelledEvent){
        Order order = orderRepository.findById(orderCancelledEvent.getOrderId()).get();
        order.setOrderStatus(orderCancelledEvent.getOrderStatus());

        orderRepository.save(order);
    }
}
