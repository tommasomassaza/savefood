package com.ted.savefood.commonutils.events;

import lombok.Data;

@Data
public class BoxQuantityModifiedEvent {
    private String orderId;
    private String boxId;
    private int quantity;
}
