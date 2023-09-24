package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ShopCancelEvent {
    private String shopId;
}
