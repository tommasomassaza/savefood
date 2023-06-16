package com.ted.savefood.userservice.common.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class VerificationToken {

    // 10 minutes
    private static final int EXPIRATION_TIME=10;
    @Id
    private String id;
    private String token;
    private Date expirationTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_USER_VERIFY_TOKEN"))
    private User user;

    public VerificationToken(User user, String token){
        super();
        this.token=token;
        this.user=user;
        this.expirationTime=calculateExpirationDate();
    }

    public VerificationToken(String token){
        super();
        this.token=token;
        this.expirationTime=calculateExpirationDate();
    }

    private Date calculateExpirationDate(){
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION_TIME);

        return new Date(calendar.getTime().getTime());
    }
}
