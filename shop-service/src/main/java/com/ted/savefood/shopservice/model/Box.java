package com.ted.savefood.shopservice.model;

import jakarta.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "boxes")
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String description;

    private int size;

    private String pickUpTime;

    private float price;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;

    @OneToMany(
            mappedBy = "box",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Reservation> reservations= new LinkedList<>();


    // Costruttori
    public Box(){}

    public Box(String name, String description, int size, String pickUpTime, float price, int quantity){
        this.name = name;
        this.description = description;
        this.size = size;
        this.pickUpTime = pickUpTime;
        this.price = price;
        this.quantity = quantity;
    }


    // Getter & Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getPickUpTime() {
        return pickUpTime;
    }

    public void setPickUpTime(String pickUpTime) {
        this.pickUpTime = pickUpTime;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }
}