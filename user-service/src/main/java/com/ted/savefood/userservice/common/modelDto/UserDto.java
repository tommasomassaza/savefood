package com.ted.savefood.userservice.common.modelDto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String password;
    private String matchingPassword;
}
