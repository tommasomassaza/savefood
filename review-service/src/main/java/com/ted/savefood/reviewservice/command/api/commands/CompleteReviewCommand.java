package com.ted.savefood.reviewservice.command.api.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class CompleteReviewCommand {
    @TargetAggregateIdentifier
    private String reviewId;
}
