package com.ted.savefood.orderservice.model;

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
    private String customerId;
    private int quantity;
    private String orderStatus;
}
