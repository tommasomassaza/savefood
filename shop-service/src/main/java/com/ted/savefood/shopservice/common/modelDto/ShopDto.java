package com.ted.savefood.shopservice.common.modelDto;

import lombok.Data;

import javax.annotation.Nullable;

@Data
public class ShopDto {
    @Nullable
    private String shopId;
    private String sellerId;
    private String name;
    private String city;
    private String address;
    private String description;
    private String telephoneNumber;
    @Nullable
    private int numberOfReviews;
    @Nullable
    private float stars;

    private byte[] image;
}
