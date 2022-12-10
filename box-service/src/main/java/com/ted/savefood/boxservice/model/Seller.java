package com.ted.savefood.boxservice.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
