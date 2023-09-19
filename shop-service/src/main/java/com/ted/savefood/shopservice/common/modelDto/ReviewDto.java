package com.ted.savefood.shopservice.common.modelDto;

import lombok.Data;

import javax.annotation.Nullable;

@Data
public class ReviewDto {
    @Nullable
    private String reviewId;
    private String shopId;
    private String customerId;
    private String description;
    private int stars;
}
