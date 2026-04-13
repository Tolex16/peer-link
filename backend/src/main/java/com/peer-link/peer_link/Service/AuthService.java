package com.dcg.digi_cap_group.Service;

import com.dcg.digi_cap_group.Domain.Dto.LoginRequest;
import com.dcg.digi_cap_group.Domain.Dto.SignUpRequest;
import com.dcg.digi_cap_group.Domain.Dto.UpdateProfileRequest;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Response.LoginResponse;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.Optional;

public interface AuthService {
    ResponseEntity<?> investorRegister(SignUpRequest signUpRequest);

    LoginResponse loginIn(LoginRequest loginRequest);

    Map<String, Boolean> checkMail(String email);

    void accountReactivated(String email);

    void cleanUpInactiveAccounts();

    void logout(String token);

    void deleteInactiveAccounts();
    void createAdminUsers();
    void warnUsersPendingDeletion();
    void updateProfile(UpdateProfileRequest request);

    String getProfileImageBase64();

    Optional<Users> getInvestorDisplay();
}
