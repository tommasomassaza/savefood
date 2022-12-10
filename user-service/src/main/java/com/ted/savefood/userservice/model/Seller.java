package com.ted.savefood.userservice.model;

import jakarta.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "sellers")
public class Seller extends User {
    @OneToMany(
            mappedBy = "seller",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Shop> shops= new LinkedList<>();


    // Costruttori
    public Seller() {}
    public Seller(String email, String password) {
        super(email, password);
    }


    // Getter & Setter
    public List<Shop> getShops() {
        return shops;
    }
}
