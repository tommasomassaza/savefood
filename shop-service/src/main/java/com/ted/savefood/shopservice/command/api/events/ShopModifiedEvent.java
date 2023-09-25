package com.ted.savefood.shopservice.command.api.events;

import lombok.Data;

@Data
public class ShopModifiedEvent {
    private String shopId;
    private String sellerId;
    private String name;
    private String city;
    private String address;
    private String description;
    private String telephoneNumber;
    private int numberOfReviews;
    private float stars;
    private byte[] image;
}
