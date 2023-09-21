package com.ted.savefood.commonutils.events;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderReservedEvent {
    private String reservationId;
    private String orderId;
    private String reservationStatus;
}
