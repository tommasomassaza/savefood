package com.ted.savefood.boxservice.command.api.commands;

import lombok.Value;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Value
public class CancelBoxCommand {
    @TargetAggregateIdentifier
    private String boxId;
}
