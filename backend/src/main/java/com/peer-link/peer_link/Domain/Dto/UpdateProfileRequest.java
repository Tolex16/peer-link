package com.dcg.digi_cap_group.Domain.Dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String base64Image;
}