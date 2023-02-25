package com.ted.savefood.orderservice.eventhandler;

import com.ted.savefood.commonfunctionality.events.CancelOrderEvent;
import com.ted.savefood.commonfunctionality.events.CompleteOrderEvent;
import com.ted.savefood.orderservice.events.CreateOrderEvent;
import com.ted.savefood.orderservice.model.Order;
import com.ted.savefood.orderservice.repository.OrderRepository;
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
    public void on(CreateOrderEvent createOrderEvent){
        Order order = new Order();
        BeanUtils.copyProperties(createOrderEvent,order);

        orderRepository.save(order);
    }

    @EventHandler
    public void on(CompleteOrderEvent completeOrderEvent){
        Order order
                = orderRepository.findById(completeOrderEvent.getOrderId()).get();
        order.setOrderStatus(completeOrderEvent.getOrderStatus());

        orderRepository.save(order);
    }

    @EventHandler
    public void on(CancelOrderEvent cancelOrderEvent){
        Order order
                = orderRepository.findById(cancelOrderEvent.getOrderId()).get();
        order.setOrderStatus(cancelOrderEvent.getOrderStatus());

        orderRepository.save(order);
    }
}
