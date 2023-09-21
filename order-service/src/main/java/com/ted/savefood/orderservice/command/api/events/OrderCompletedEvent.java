package com.ted.savefood.orderservice.command.api.events;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderCompletedEvent {
    private String orderId;
}
