package com.plk.peer_link.Service;


import com.plk.peer_link.Domain.Dto.LoginRequest;
import com.plk.peer_link.Domain.Dto.SignUpRequest;
import com.plk.peer_link.Domain.Dto.UpdateProfileRequest;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Response.LoginResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AuthService {
    ResponseEntity<?> investorRegister(SignUpRequest signUpRequest);

    LoginResponse loginIn(LoginRequest loginRequest);

    Map<String, Boolean> checkMail(String email);

    void accountReactivated(String email);

    void cleanUpInactiveAccounts();

    void logout(String token);

    List<Users> searchUsers(String keyword);
    void deleteInactiveAccounts();
    void createAdminUsers();
    void warnUsersPendingDeletion();
    void updateProfile(UpdateProfileRequest request);

    String getProfileImageBase64();

    Optional<Users> getInvestorDisplay();
}
