package com.ted.savefood.shopservice.command.api.events;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShopCancelCompleteEvent {
    private String shopId;
}
