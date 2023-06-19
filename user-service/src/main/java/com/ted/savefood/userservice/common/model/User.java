package com.ted.savefood.userservice.common.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    private String userId;
    private String email;
    private String role;
}