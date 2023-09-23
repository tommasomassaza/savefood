package com.ted.savefood.commonutils.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class ModifyStarsShopCommand {
    @TargetAggregateIdentifier
    private String shopId;
    private String reviewId;
    private int stars;
}
