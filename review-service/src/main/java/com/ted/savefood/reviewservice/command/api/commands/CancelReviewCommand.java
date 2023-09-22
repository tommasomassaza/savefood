package com.ted.savefood.reviewservice.command.api.commands;

import lombok.Value;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Value
public class CancelReviewCommand {
    @TargetAggregateIdentifier
    private String reviewId;
}
