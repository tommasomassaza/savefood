package com.ted.savefood.orderservice.command.api.eventhandler;

import com.ted.savefood.orderservice.command.api.events.OrderCompletedEvent;
import com.ted.savefood.orderservice.common.model.Order;
import com.ted.savefood.orderservice.common.repository.OrderRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderEventHandler {
    @Autowired
    private OrderRepository orderRepository;

    @EventHandler
    public void on(OrderCompletedEvent orderCompletedEvent) {
        Order order = new Order();
        BeanUtils.copyProperties(orderCompletedEvent, order);

        orderRepository.save(order);
    }
}
