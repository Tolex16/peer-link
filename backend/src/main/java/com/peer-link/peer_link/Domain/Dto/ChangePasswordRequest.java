package com.dcg.digi_cap_group.Domain.Dto;

import com.dcg.digi_cap_group.Config.StrongPassword;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ChangePasswordRequest {

    @NotBlank(message = "Current password required")
    private String currentPassword;

    @NotBlank(message = "New password required")
    @StrongPassword
    private String newPassword;

    @NotBlank(message = "Confirm new password required")
    @StrongPassword
    private String confirmNewPassword;
}
