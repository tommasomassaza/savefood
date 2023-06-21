package com.ted.savefood.shopservice.command.api.eventHandler;

import com.ted.savefood.shopservice.command.api.events.ShopCreatedEvent;
import com.ted.savefood.shopservice.common.model.Shop;
import com.ted.savefood.shopservice.common.repository.ShopRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class ShopEventHandler {
    private final ShopRepository shopRepository;

    public ShopEventHandler(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @EventHandler
    public void on(ShopCreatedEvent shopCreatedEvent) {
        Shop shop = new Shop();
        BeanUtils.copyProperties(shopCreatedEvent, shop);

        shopRepository.save(shop);
    }
}
