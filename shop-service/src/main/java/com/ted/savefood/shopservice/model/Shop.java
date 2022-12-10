package com.ted.savefood.shopservice.model;

import com.ted.savefood.shopservice.model.model.Box;
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
