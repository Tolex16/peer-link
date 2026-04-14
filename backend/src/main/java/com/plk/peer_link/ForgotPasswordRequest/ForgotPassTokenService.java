package com.plk.peer_link.ForgotPasswordRequest;

import com.plk.peer_link.Domain.Dto.ForgetPasswordRequest;
import com.plk.peer_link.Domain.Dto.ResetPassword;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface ForgotPassTokenService {
    @Transactional
    void initiateForgotPass(ForgetPasswordRequest forgetPasswordRequest);

    @Transactional
    ResponseEntity<String> resetPassword(ResetPassword resetPassword);

    void clearTokenAfterExpiration();
}