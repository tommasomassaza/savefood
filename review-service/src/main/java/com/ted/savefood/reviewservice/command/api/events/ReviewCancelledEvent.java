package com.ted.savefood.reviewservice.command.api.events;

import lombok.Data;

@Data
public class ReviewCancelledEvent {
    private String reviewId;
}
