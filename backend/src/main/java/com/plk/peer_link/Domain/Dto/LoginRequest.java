package com.plk.peer_link.Domain.Dto;

import com.plk.peer_link.Config.StrongPassword;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class LoginRequest {

    @Email(message = "Email should be valid")
    private final String email;

    @StrongPassword
    private final String password;
}
