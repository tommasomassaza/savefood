package com.ted.savefood.userservice.model;

import jakarta.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer extends User {
    private String geographicLocation;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Reservation> reservations= new LinkedList<>();

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Review> reviews= new LinkedList<>();


    // Costruttori
    public Customer() {}

    public Customer(String email, String password, String geographicLocation) {
        super(email, password);
        this.geographicLocation = geographicLocation;
    }


    // Getter & Setter
    public String getGeographicLocation() {
        return geographicLocation;
    }

    public void setGeographicLocation(String geographicLocation) {
        this.geographicLocation = geographicLocation;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public List<Review> getReviews() {
        return reviews;
    }
}