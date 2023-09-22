package com.ted.savefood.reviewservice.command.api.events;

import lombok.Data;

@Data
public class ReviewCreatedEvent {
    private String reviewId;
    private String shopId;
    private String userId;
    private String userName;
    private String description;
    private int stars;
}
