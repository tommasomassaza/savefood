package com.ted.savefood.userservice.model;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class User {
    @Id
    private String userId;
    private String email;
    private String password;
}