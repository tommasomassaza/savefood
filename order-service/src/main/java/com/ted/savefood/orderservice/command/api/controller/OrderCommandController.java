package com.ted.savefood.orderservice.command.api.controller;

import com.ted.savefood.orderservice.command.api.commands.CreateOrderCommand;
import com.ted.savefood.orderservice.common.modelDto.OrderDto;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderCommandController {
    private CommandGateway commandGateway;

    public OrderCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createOrder(@RequestBody OrderDto orderDto){
        String orderId = UUID.randomUUID().toString();
        CreateOrderCommand createOrderCommand = new CreateOrderCommand();
        BeanUtils.copyProperties(orderDto,createOrderCommand);

        createOrderCommand.setOrderId(orderId);
        createOrderCommand.setOrderStatus("CREATED");

        String ret = commandGateway.sendAndWait(createOrderCommand);

        return ret;
    }
}
