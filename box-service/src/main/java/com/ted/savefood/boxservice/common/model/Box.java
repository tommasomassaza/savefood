package com.ted.savefood.boxservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "boxes")
public class Box {
    @Id
    private String boxId;
    private String shopId;
    private String name;
    private String description;
    private float price;
    private int size;
    private String pickUpTime;
    private int quantity;
}