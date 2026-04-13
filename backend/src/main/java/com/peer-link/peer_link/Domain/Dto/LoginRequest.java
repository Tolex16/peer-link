package com.dcg.digi_cap_group.Domain.Dto;

import com.dcg.digi_cap_group.Config.StrongPassword;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class LoginRequest {

    @Email(message = "Email should be valid")
    private final String email;

    @StrongPassword
    private final String password;
}
