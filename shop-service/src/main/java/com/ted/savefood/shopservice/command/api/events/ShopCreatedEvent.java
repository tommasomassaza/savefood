package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ShopCreatedEvent {
    private String shopId;
    private String sellerId;
    private String name;
    private String city;
    private String address;
    private String description;
    private int telephoneNumber;
    private int numberOfReviews;
    private int stars;
    private String image;
}
