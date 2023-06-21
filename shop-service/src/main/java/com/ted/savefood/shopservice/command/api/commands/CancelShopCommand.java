package com.ted.savefood.shopservice.command.api.commands;

import lombok.Value;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Value
public class CancelShopCommand {
    @TargetAggregateIdentifier
    private String shopId;
}
