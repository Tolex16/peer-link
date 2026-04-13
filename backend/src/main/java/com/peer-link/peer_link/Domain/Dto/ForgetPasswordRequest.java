package com.dcg.digi_cap_group.Domain.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgetPasswordRequest {

    @NotBlank(message = "Email is mandatory")
	@Email(message = "Input a real email address")
    @JsonProperty("email")
    private String email;

}
