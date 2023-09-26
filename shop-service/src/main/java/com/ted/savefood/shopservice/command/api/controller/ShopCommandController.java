package com.ted.savefood.shopservice.command.api.controller;

import com.ted.savefood.shopservice.command.api.commands.CancelShopCommand;
import com.ted.savefood.shopservice.command.api.commands.CreateShopCommand;
import com.ted.savefood.shopservice.command.api.commands.ModifyShopCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
public class ShopCommandController {
    private final CommandGateway commandGateway;

    public ShopCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String addShop(
            @RequestParam("sellerId") String sellerId,
            @RequestParam("name") String name,
            @RequestParam("city") String city,
            @RequestParam("address") String address,
            @RequestParam("description") String description,
            @RequestParam("telephoneNumber") String telephoneNumber,
            @RequestParam("image") MultipartFile imageFile
    ) {
        String shopId = UUID.randomUUID().toString();
        CreateShopCommand createShopCommand = new CreateShopCommand();

        createShopCommand.setShopId(shopId);
        createShopCommand.setSellerId(sellerId);
        createShopCommand.setName(name);
        createShopCommand.setCity(city);
        createShopCommand.setAddress(address);
        createShopCommand.setDescription(description);
        createShopCommand.setTelephoneNumber(telephoneNumber);
        createShopCommand.setNumberOfReviews(0);
        createShopCommand.setStars(0);

        // Converti il file MultipartFile in un array di byte
        try {
            byte[] imageBytes = imageFile.getBytes();
            createShopCommand.setImage(imageBytes);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String result = commandGateway.sendAndWait(createShopCommand);
        return result;
    }

    @PutMapping
    public String modifyShop(
            @RequestParam("shopId") String shopId,
            @RequestParam("sellerId") String sellerId,
            @RequestParam("name") String name,
            @RequestParam("city") String city,
            @RequestParam("address") String address,
            @RequestParam("description") String description,
            @RequestParam("telephoneNumber") String telephoneNumber,
            @RequestParam("image") MultipartFile imageFile
    ) {
        ModifyShopCommand modifyShopCommand = new ModifyShopCommand();

        modifyShopCommand.setShopId(shopId);
        modifyShopCommand.setSellerId(sellerId);
        modifyShopCommand.setName(name);
        modifyShopCommand.setCity(city);
        modifyShopCommand.setAddress(address);
        modifyShopCommand.setDescription(description);
        modifyShopCommand.setTelephoneNumber(telephoneNumber);

        try {
            byte[] imageBytes = imageFile.getBytes();
            modifyShopCommand.setImage(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String result = commandGateway.sendAndWait(modifyShopCommand);
        return result;
    }

    @DeleteMapping("{shopId}")
    public String deleteBox(@PathVariable String shopId) {
        CancelShopCommand cancelShopCommand = new CancelShopCommand(shopId);

        String result = commandGateway.sendAndWait(cancelShopCommand);
        return result;
    }
}
