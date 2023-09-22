package com.ted.savefood.commonutils.events;

import lombok.Data;

@Data
public class ShopStarsModifiedEvent {
    private String shopId;
    private int stars;
}
