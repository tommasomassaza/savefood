package com.ted.savefood.boxservice.command.api.eventHandler;

import com.ted.savefood.boxservice.command.api.events.BoxCreatedEvent;
import com.ted.savefood.boxservice.command.api.events.BoxModifiedEvent;
import com.ted.savefood.boxservice.common.model.Box;
import com.ted.savefood.boxservice.common.repository.BoxRepository;
import com.ted.savefood.commonutils.events.BoxQuantityModifiedEvent;
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

    @EventHandler
    public void on(BoxQuantityModifiedEvent boxQuantityModifiedEvent) throws Exception {
        Box box = boxRepository.findById(boxQuantityModifiedEvent.getBoxId()).orElse(null);
        if (box != null) {
            if (box.getQuantity() - boxQuantityModifiedEvent.getQuantity() < 0) throw new Exception();
            if (box.getQuantity() - boxQuantityModifiedEvent.getQuantity() == 0)
                boxRepository.deleteById(boxQuantityModifiedEvent.getBoxId());
            else {
                box.setQuantity(box.getQuantity() - boxQuantityModifiedEvent.getQuantity());
                boxRepository.save(box);
            }
        }
    }
}
