package com.dcg.digi_cap_group.ForgotPasswordRequest;

import com.dcg.digi_cap_group.Domain.Dto.ForgetPasswordRequest;
import com.dcg.digi_cap_group.Domain.Dto.ResetPassword;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface ForgotPassTokenService {
    @Transactional
    void initiateForgotPass(ForgetPasswordRequest forgetPasswordRequest);

    @Transactional
    ResponseEntity<String> resetPassword(ResetPassword resetPassword);

    void clearTokenAfterExpiration();
}