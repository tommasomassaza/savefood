package com.ted.savefood.commonutils.events;

import lombok.Data;

@Data
public class PaymentCancelledEvent {
    private String paymentId;
    private String orderId;
    private String paymentStatus = "CANCELLED";
}
