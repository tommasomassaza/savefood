package com.ted.savefood.shopservice.common.modelDto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
    private int telephoneNumber;
    @Nullable
    private int numberOfReviews;
    @Nullable
    private float stars;

    private MultipartFile image;
}
