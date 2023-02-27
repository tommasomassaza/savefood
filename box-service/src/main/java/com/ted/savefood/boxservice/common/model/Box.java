package com.ted.savefood.boxservice.common.model;

import jakarta.persistence.*;
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
    private int size;
    private String pickUpTime;
}