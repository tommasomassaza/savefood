package com.ted.savefood.boxservice.command.api.controller;

import com.ted.savefood.boxservice.command.api.commands.CancelBoxCommand;
import com.ted.savefood.boxservice.command.api.commands.CreateBoxCommand;
import com.ted.savefood.boxservice.command.api.commands.ModifyBoxCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/boxes")
public class BoxCommandController {
    private final CommandGateway commandGateway;

    public BoxCommandController(CommandGateway commandGateway){
        this.commandGateway=commandGateway;
    }

    @PostMapping
    public String addBox(
            @RequestParam("shopId") String shopId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") float price,
            @RequestParam("size") int size,
            @RequestParam("pickUpTime") String pickUpTime,
            @RequestParam("city") String city,
            @RequestParam("quantity") int quantity,
            @RequestParam("image") MultipartFile imageFile
    ) {
        String boxId = UUID.randomUUID().toString();
        CreateBoxCommand createBoxCommand = new CreateBoxCommand();

        createBoxCommand.setBoxId(boxId);
        createBoxCommand.setShopId(shopId);
        createBoxCommand.setName(name);
        createBoxCommand.setDescription(description);
        createBoxCommand.setPrice(price);
        createBoxCommand.setSize(size);
        createBoxCommand.setPickUpTime(pickUpTime);
        createBoxCommand.setCity(city);
        createBoxCommand.setQuantity(quantity);

        try {
            byte[] imageBytes = imageFile.getBytes();
            createBoxCommand.setImage(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String result = commandGateway.sendAndWait(createBoxCommand);
        return result;
    }

    @PutMapping
    public String modifyBox(
            @RequestParam("boxId") String boxId,
            @RequestParam("shopId") String shopId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") float price,
            @RequestParam("size") int size,
            @RequestParam("pickUpTime") String pickUpTime,
            @RequestParam("city") String city,
            @RequestParam("quantity") int quantity,
            @RequestParam("image") MultipartFile imageFile
    ) {
        ModifyBoxCommand modifyBoxCommand = new ModifyBoxCommand();

        modifyBoxCommand.setBoxId(boxId);
        modifyBoxCommand.setShopId(shopId);
        modifyBoxCommand.setName(name);
        modifyBoxCommand.setDescription(description);
        modifyBoxCommand.setPrice(price);
        modifyBoxCommand.setSize(size);
        modifyBoxCommand.setPickUpTime(pickUpTime);
        modifyBoxCommand.setCity(city);
        modifyBoxCommand.setQuantity(quantity);

        try {
            byte[] imageBytes = imageFile.getBytes();
            modifyBoxCommand.setImage(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String result = commandGateway.sendAndWait(modifyBoxCommand);
        return result;
    }

    @DeleteMapping("{boxId}")
    public String deleteBox(@PathVariable String boxId){
        CancelBoxCommand cancelBoxCommand = new CancelBoxCommand(boxId);

        String result = commandGateway.sendAndWait(cancelBoxCommand);
        return result;
    }
}
