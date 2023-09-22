package com.ted.savefood.reviewservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    private String reviewId;
    private String shopId;
    private String userId;
    private String userName;
    private String description;
    private int stars;
}
