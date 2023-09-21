package com.ted.savefood.orderservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    private String orderId;
    private String boxId;
    private String boxName;
    private String userId;
    private String userName;
    private String shopId;
    private int quantity;
    private float price;
    private String pickUpTime;
}
