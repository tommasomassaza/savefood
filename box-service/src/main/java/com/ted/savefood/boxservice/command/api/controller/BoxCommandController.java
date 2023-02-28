package com.ted.savefood.boxservice.command.api.controller;

import com.ted.savefood.boxservice.command.api.commands.CreateBoxCommand;
import com.ted.savefood.boxservice.command.api.commands.CancelBoxCommand;
import com.ted.savefood.boxservice.common.modelDto.BoxDto;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/boxes")
public class BoxCommandController {
    private CommandGateway commandGateway;

    public BoxCommandController(CommandGateway commandGateway){
        this.commandGateway=commandGateway;
    }

    @PostMapping
    public String addBox(@RequestBody BoxDto boxDto){
        String boxId = UUID.randomUUID().toString();
        CreateBoxCommand createBoxCommand = new CreateBoxCommand();
        BeanUtils.copyProperties(boxDto,createBoxCommand);

        createBoxCommand.setBoxId(boxId);

        String result = commandGateway.sendAndWait(createBoxCommand);
        return result;
    }

    @DeleteMapping("{boxId}")
    public String deleteBox(@PathVariable String boxId){
        CancelBoxCommand cancelBoxCommand = new CancelBoxCommand(boxId);

        String result = commandGateway.sendAndWait(cancelBoxCommand);
        return result;
    }
}
