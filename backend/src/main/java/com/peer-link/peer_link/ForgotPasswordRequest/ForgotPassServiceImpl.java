package com.dcg.digi_cap_group.ForgotPasswordRequest;

import com.dcg.digi_cap_group.Domain.Dto.ForgetPasswordRequest;
import com.dcg.digi_cap_group.Domain.Dto.ResetPassword;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.ExceptionHandler.EmailNotFoundException;
import com.dcg.digi_cap_group.Repository.UserRepository;

import com.dcg.digi_cap_group.Service.EmailService;
import lombok.RequiredArgsConstructor;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForgotPassServiceImpl implements ForgotPassTokenService{

    private final ForgotPassTokenRep forgotPassTokenRep;

    private final EmailService emailService;

    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;


    @Transactional
    @Override
    public void initiateForgotPass(ForgetPasswordRequest forgetPasswordRequest) {
        try {
            Users existingUser = userRepository.findByEmailIgnoreCaseAndDeletedFalse(forgetPasswordRequest.getEmail()).orElse(null);
            if (existingUser == null) {
                throw new EmailNotFoundException("User not found");
            }
            ForgotPassToken forgotPassToken = new ForgotPassToken();

            forgotPassToken.setExpireTime(expireTimeRange());
            forgotPassToken.setToken(generateSecureToken());
            forgotPassToken.setUser(existingUser);
            forgotPassToken.setUsed(false);
            forgotPassTokenRep.save(forgotPassToken);
			
			String resetLink = "https://digicapgroup.org/reset-password?token=" + forgotPassToken.getToken();


            // Send mail after commit so DB success isn't rolled back by mail errors
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override public void afterCommit() {
                    try {
                        emailService.sendPasswordMail(existingUser.getEmail(), existingUser.getFirstName(), resetLink);
                    } catch (Exception e) {
                        throw new MailSendException("Failed to send reset mail", e);
                    }
                }
            });

        } catch (Exception e) {
            throw new RuntimeException("Failed to execute action", e);
        }
    }

    @Transactional
    @Override
    public ResponseEntity<String> resetPassword(ResetPassword resetPassword) {
    Optional<ForgotPassToken> forgotPassTokenOpt = findByToken(resetPassword.getToken());
        
    if (!forgotPassTokenOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Token has expired or is invalid");
     }
	 
	ForgotPassToken forgotPassToken = forgotPassTokenOpt.get();
		
	if (forgotPassToken == null || !forgotPassToken.getToken().equals(resetPassword.getToken())) {
        return ResponseEntity.badRequest().body("Token does not match");
    }

    Users userEntity = forgotPassToken.getUser();
    if (userEntity != null) {
        checkValidity(forgotPassToken);
        userEntity.setPassword(passwordEncoder.encode(resetPassword.getNewPassword()));
        forgotPassToken.setUsed(true);
        userRepository.save(userEntity);
        forgotPassTokenRep.save(forgotPassToken);
        return ResponseEntity.ok("Password Reset successful.");
    } else {
        return ResponseEntity.badRequest().body("User not found");
    }
}

    public Optional<ForgotPassToken> findByToken(String token) {
        Optional<ForgotPassToken> forgotPassToken = forgotPassTokenRep.findByToken(token);
        if (forgotPassToken.isPresent()) {
            LocalDateTime now = LocalDateTime.now();
            if (now.isAfter(forgotPassToken.get().getExpireTime())) {
                forgotPassTokenRep.delete(forgotPassToken.get()); // This line deletes the entire row
                return Optional.empty(); // Token has expired and deleted
            }
        }
        return forgotPassToken;
    }

    @Transactional(readOnly = true)
    @Scheduled(cron = "0 0 1 * * *") // This cron expression runs every minute
    public void clearTokenAfterExpiration() {
        List<ForgotPassToken> forgotPassTokens = forgotPassTokenRep.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (ForgotPassToken forgotPassToken : forgotPassTokens) {
            LocalDateTime tokenExpire = forgotPassToken.getExpireTime();
            if (now.isAfter(tokenExpire)) {
                forgotPassTokenRep.delete(forgotPassToken); // This line deletes the entire row
            }
        }
    }

    public LocalDateTime expireTimeRange(){
        int MINS = 10;
        return LocalDateTime.now().plusMinutes(MINS);
    }

    public String generateOTP(){
        List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 1));

        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generatePassword(6,rules);
        return password;
    }

    // URL-safe strong token (32 bytes -> ~43 char Base64URL)
    private String generateSecureToken() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }


    public boolean isExpired(ForgotPassToken forgotPassToken){
        return LocalDateTime.now().isAfter(forgotPassToken.getExpireTime());
    }

    public ResponseEntity<String> checkValidity(ForgotPassToken forgotPassToken){
        if (forgotPassToken == null){
            return ResponseEntity.badRequest().body("token not found");
        }
        else  if (forgotPassToken.isUsed()){
            return ResponseEntity.badRequest().body("token already used");
        } else if (isExpired(forgotPassToken)) {
            return ResponseEntity.badRequest().body("token is expired");
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
