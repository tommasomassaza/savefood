package com.ted.savefood.commonfunctionality.events;

import lombok.Data;

@Data
public class CancelOrderEvent {
    private String orderId;
    private String orderStatus;
}
