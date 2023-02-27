package com.ted.savefood.userservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "sellers")
public class Seller extends User {
}
