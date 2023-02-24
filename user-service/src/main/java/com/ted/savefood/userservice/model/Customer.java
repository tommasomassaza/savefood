package com.ted.savefood.userservice.model;

import com.ted.savefood.commonfunctionality.model.CardDetails;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer extends User{
    private CardDetails cardDetails;
}
