package com.ted.savefood.orderservice.command.api.controller;

import com.ted.savefood.orderservice.command.api.commands.CancelOrderCommand;
import com.ted.savefood.orderservice.command.api.commands.CreateOrderCommand;
import com.ted.savefood.orderservice.common.modelDto.OrderDto;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderCommandController {
    private final CommandGateway commandGateway;

    public OrderCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createOrder(@RequestBody OrderDto orderDto){
        String orderId = UUID.randomUUID().toString();
        CreateOrderCommand createOrderCommand = new CreateOrderCommand();
        BeanUtils.copyProperties(orderDto,createOrderCommand);

        createOrderCommand.setOrderId(orderId);

        String ret = commandGateway.sendAndWait(createOrderCommand);

        return ret;
    }

    @DeleteMapping("{orderId}")
    public String deleteOrder(@PathVariable String orderId) {
        CancelOrderCommand cancelOrderCommand = new CancelOrderCommand(orderId);

        String result = commandGateway.sendAndWait(cancelOrderCommand);
        return result;
    }
}
