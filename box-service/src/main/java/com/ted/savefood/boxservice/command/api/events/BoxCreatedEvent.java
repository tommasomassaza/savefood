package com.ted.savefood.boxservice.command.api.events;

import lombok.Data;

@Data
public class BoxCreatedEvent {
    private String boxId;
    private String shopId;
    private String name;
    private String description;
    private float price;
    private int size;
    private String pickUpTime;
    private String city;
    private int quantity;
    private byte[] image;
}
