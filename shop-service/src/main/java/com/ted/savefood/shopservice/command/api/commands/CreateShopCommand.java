package com.ted.savefood.shopservice.command.api.commands;

import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
public class CreateShopCommand {
    @TargetAggregateIdentifier
    private String shopId;
    private String sellerId;
    private String name;
    private String address;
    private String description;
    private int telephoneNumber;
    private int numberOfReviews;
    private int stars;
}
