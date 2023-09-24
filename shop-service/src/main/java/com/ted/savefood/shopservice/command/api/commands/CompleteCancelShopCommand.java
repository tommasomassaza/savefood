package com.ted.savefood.shopservice.command.api.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class CompleteCancelShopCommand {
    @TargetAggregateIdentifier
    private String shopId;
}
