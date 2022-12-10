package com.ted.savefood.reservationservice.model;

import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String transactionTime;

    private String paymentMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;

    @OneToMany(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Box> boxes= new LinkedList<>();


    // Costruttori
    public Reservation(){}

    public Reservation(String transactionTime, String paymentMethod){
        this.transactionTime = transactionTime;
        this.paymentMethod = paymentMethod;
    }


    // Getter & Setter
    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(String transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Box> getBoxes() {
        return boxes;
    }
}
