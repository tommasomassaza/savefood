package com.ted.savefood.commonfunctionality.events;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationOrderEvent {
    private String reservationId;
    private String orderId;
    private String reservationStatus;
}
