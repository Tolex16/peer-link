package com.plk.peer_link.Domain.Dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plk.peer_link.Config.StrongPassword;
import com.plk.peer_link.Domain.Entities.Role;
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
	
	private String username;
    private String profileImage;

    @Email(message = "Email should be valid")
    private String email;

    @StrongPassword
    @JsonIgnore
    private String password;

    private Role role;
	
	private String bio;
    private long followersCount;
    private long followingCount;
}
