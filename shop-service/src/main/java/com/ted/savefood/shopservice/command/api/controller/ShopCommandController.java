package com.ted.savefood.shopservice.command.api.controller;

import com.ted.savefood.shopservice.command.api.commands.CancelShopCommand;
import com.ted.savefood.shopservice.command.api.commands.CreateShopCommand;
import com.ted.savefood.shopservice.common.modelDto.ShopDto;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
public class ShopCommandController {
    private final CommandGateway commandGateway;

    public ShopCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String addShop(@RequestBody ShopDto shopDto) {
        String shopId = UUID.randomUUID().toString();
        CreateShopCommand createShopCommand = new CreateShopCommand();
        BeanUtils.copyProperties(shopDto, createShopCommand);

        createShopCommand.setShopId(shopId);
        createShopCommand.setNumberOfReviews(0);
        createShopCommand.setStars(0);

        String result = commandGateway.sendAndWait(createShopCommand);
        return result;
    }

    @DeleteMapping("{shopId}")
    public String deleteBox(@PathVariable String shopId) {
        CancelShopCommand cancelShopCommand = new CancelShopCommand(shopId);

        String result = commandGateway.sendAndWait(cancelShopCommand);
        return result;
    }
}
