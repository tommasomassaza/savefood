package com.ted.savefood.reviewservice.common.modelDto;

import lombok.Data;
import org.jetbrains.annotations.Nullable;

@Data
public class ReviewDto {
    @Nullable
    private String reviewId;
    private String shopId;
    private String userId;
    private String userName;
    private String description;
    private int stars;
}
