package com.ted.savefood.reviewservice.command.api.commands;

import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
public class CreateReviewCommand {
    @TargetAggregateIdentifier
    private String reviewId;
    private String shopId;
    private String userId;
    private String userName;
    private String description;
    private int stars;
}
