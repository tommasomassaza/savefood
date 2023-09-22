package com.ted.savefood.reviewservice.command.api.events;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewCompletedEvent {
    private String reviewId;
}
