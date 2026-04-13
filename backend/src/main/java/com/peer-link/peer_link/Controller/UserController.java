package com.dcg.digi_cap_group.Controller;

import com.dcg.digi_cap_group.Domain.Dto.InvestorProfile;
import com.dcg.digi_cap_group.Domain.Dto.UpdateProfileRequest;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
import com.dcg.digi_cap_group.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final AuthService authenticationService;

    private final Mapper<Users, InvestorProfile> investorProfileMapper;


    @GetMapping("/get-bio")
    public ResponseEntity<InvestorProfile> getInvestorDisplay() {
        Optional<Users> usersOptional = authenticationService.getInvestorDisplay();
        if (usersOptional.isPresent()) {
            InvestorProfile investorProfile = investorProfileMapper.mapTo(usersOptional.get());
            return ResponseEntity.ok(investorProfile);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        authenticationService.logout(token.substring(7)); // Remove "Bearer " prefix
        return ResponseEntity.ok("Logged out successfully");
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody UpdateProfileRequest request
    ) {
        authenticationService.updateProfile(request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @GetMapping("/profile-image")
    public ResponseEntity<String> getProfileImage() {
        String base64Image = authenticationService.getProfileImageBase64();
        return ResponseEntity.ok(base64Image);
    }
}
