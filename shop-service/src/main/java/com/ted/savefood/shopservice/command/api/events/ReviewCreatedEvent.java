package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ReviewCreatedEvent {
    private String reviewId;
    private String shopId;
    private String customerId;
    private String description;
    private int stars;
}
