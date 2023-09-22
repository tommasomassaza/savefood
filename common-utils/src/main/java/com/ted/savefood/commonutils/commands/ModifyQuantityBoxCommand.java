package com.ted.savefood.commonutils.commands;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@Builder
public class ModifyQuantityBoxCommand {
    @TargetAggregateIdentifier
    private String boxId;
    private String orderId;
    private int quantity;
}
