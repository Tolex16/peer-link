package com.dcg.digi_cap_group.ForgotPasswordRequest;

import com.dcg.digi_cap_group.Domain.Dto.ForgetPasswordRequest;
import com.dcg.digi_cap_group.Domain.Dto.ResetPassword;
import com.dcg.digi_cap_group.ExceptionHandler.EmailNotFoundException;
import com.dcg.digi_cap_group.ExceptionHandler.InvalidPasswordException;
import com.dcg.digi_cap_group.ExceptionHandler.InvalidTokenException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/forgot-password")
@RequiredArgsConstructor
public class ForgotPasswordController {

    @Autowired
    private final ForgotPassTokenService forgotPassTokenService;

    @PostMapping("/initiate")
    public ResponseEntity<String> initiateForgotPass(@Valid @RequestBody ForgetPasswordRequest forgotPasswordRequest){

    try {
        forgotPassTokenService.initiateForgotPass(forgotPasswordRequest);
        return ResponseEntity.ok("Forgot Password sequence initiated. Check your email for instructions.");
      } catch (EmailNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
      } catch (MailSendException ex){
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(ex.getMessage());
    }

    }


   @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPassword resetPassword) {

       try {
           return forgotPassTokenService.resetPassword(resetPassword);
       } catch (InvalidTokenException | InvalidPasswordException ex){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
       }
   }
}
