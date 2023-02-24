package com.ted.savefood.reservationservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Reservation {
    @Id
    private String reservationId;
    private String orderId;
    private String reservationStatus;
}
