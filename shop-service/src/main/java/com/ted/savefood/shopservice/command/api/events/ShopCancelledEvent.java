package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ShopCancelledEvent {
    private String shopId;
}
