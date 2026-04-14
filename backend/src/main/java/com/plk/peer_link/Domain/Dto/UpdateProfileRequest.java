package com.plk.peer_link.Domain.Dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String base64Image;
    private String bio;
}