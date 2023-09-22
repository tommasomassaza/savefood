package com.ted.savefood.commonutils.events;

import lombok.Data;

@Data
public class BoxQuantityModifiedEvent {
    private String boxId;
    private String orderId;
    private int quantity;
}
