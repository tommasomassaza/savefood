package com.ted.savefood.boxservice.command.api.eventHandler;

import com.ted.savefood.boxservice.command.api.events.BoxCreatedEvent;
import com.ted.savefood.boxservice.command.api.events.BoxModifiedEvent;
import com.ted.savefood.boxservice.common.model.Box;
import com.ted.savefood.boxservice.common.repository.BoxRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class BoxEventHandler {
    private final BoxRepository boxRepository;

    public BoxEventHandler(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    @EventHandler
    public void on(BoxCreatedEvent boxCreatedEvent){
        Box box = new Box();
        BeanUtils.copyProperties(boxCreatedEvent,box);

        boxRepository.save(box);
    }

    @EventHandler
    public void on(BoxModifiedEvent boxModifiedEvent) {
        Box box = new Box();
        BeanUtils.copyProperties(boxModifiedEvent, box);

        boxRepository.save(box);
    }
}
