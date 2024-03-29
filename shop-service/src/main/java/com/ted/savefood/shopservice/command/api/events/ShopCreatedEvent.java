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
    private String telephoneNumber;
    private int numberOfReviews;
    private int stars;
    private byte[] image;
}
