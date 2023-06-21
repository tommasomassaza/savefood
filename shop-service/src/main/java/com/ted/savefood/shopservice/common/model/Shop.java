package com.ted.savefood.shopservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "shops")
public class Shop {
    @Id
    private String shopId;
    private String sellerId;
    private String name;
    private String address;
    private String description;
    private int telephoneNumber;
    private int numberOfReviews;
    private int stars;
}
