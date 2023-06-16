package com.ted.savefood.userservice.common.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    private String userId;
    private String email;
    @Column(length = 60)
    private String password;
    private String role;
    private boolean enabled;
}