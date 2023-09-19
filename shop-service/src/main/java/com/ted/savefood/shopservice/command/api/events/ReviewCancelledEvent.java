package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ReviewCancelledEvent {
    private String reviewId;
}
