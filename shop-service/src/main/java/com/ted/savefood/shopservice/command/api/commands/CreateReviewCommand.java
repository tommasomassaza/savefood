package com.ted.savefood.shopservice.command.api.commands;

import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
public class CreateReviewCommand {
    @TargetAggregateIdentifier
    private String reviewId;
    private String shopId;
    private String customerId;
    private String description;
    private int stars;
}
