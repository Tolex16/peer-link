package com.dcg.digi_cap_group.Domain.Dto;

import com.dcg.digi_cap_group.Config.StrongPassword;
import com.dcg.digi_cap_group.Domain.Entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto {

    private String firstName;

    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    @StrongPassword
    @JsonIgnore
    private String password;

    private Role role;
}
