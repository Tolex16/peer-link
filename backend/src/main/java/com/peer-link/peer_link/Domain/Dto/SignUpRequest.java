package com.dcg.digi_cap_group.Domain.Dto;

import com.dcg.digi_cap_group.Config.StrongPassword;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SignUpRequest {

    private String firstName;

    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    @StrongPassword
    private String password;

}
