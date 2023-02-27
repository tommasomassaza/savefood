package com.ted.savefood.commonfunctionality.events;

import lombok.Data;

@Data
public class CancelPaymentEvent {
    private String paymentId;
    private String orderId;
    private String paymentStatus = "CANCELLED";
}
