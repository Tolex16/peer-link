package com.plk.peer_link.Domain.Dto;

import com.plk.peer_link.Config.StrongPassword;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ResetPassword {

    @NotBlank(message = "Token required")
    private String token;

    @NotBlank(message = "New password required")
    @StrongPassword
    private String newPassword;

}
