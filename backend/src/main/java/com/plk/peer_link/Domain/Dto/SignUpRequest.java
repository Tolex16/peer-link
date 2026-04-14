package com.plk.peer_link.Domain.Dto;

import com.plk.peer_link.Config.StrongPassword;
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
	
	private String username;

    @Email(message = "Email should be valid")
    private String email;

    @StrongPassword
    private String password;

}
