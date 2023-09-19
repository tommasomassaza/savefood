package com.ted.savefood.shopservice.command.api.commands;

import lombok.Value;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Value
public class CancelReviewCommand {
    @TargetAggregateIdentifier
    private String reviewId;
}
