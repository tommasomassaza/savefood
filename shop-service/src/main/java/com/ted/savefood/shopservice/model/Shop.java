package com.ted.savefood.shopservice.model;

import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "shops")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String address;

    private String description;

    private int telephoneNumber;

    private int numberOfReviews;
    private int stars;

    @ManyToOne(fetch = FetchType.LAZY)
    private Seller seller;

    @OneToMany(
            mappedBy = "shop",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Box> boxes= new LinkedList<>();

    @OneToMany(
            mappedBy = "shop",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Review> reviews= new LinkedList<>();


    // Costruttori
    public Shop() {}

    public Shop(String name, String address, String description, int telephoneNumber) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.telephoneNumber = telephoneNumber;
        this.numberOfReviews = 0;
        this.stars = 0;
    }


    // Getter & Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(int telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public List<Box> getBoxes() {
        return boxes;
    }

    public List<Review> getReviews() {
        return reviews;
    }
}
