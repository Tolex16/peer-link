package com.dcg.digi_cap_group.Controller;

import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
import com.dcg.digi_cap_group.Repository.UserRepository;
import com.dcg.digi_cap_group.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.dqa.digi_quantum_analytics.Domain.Dto.InvestorList;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
	
    private final UserRepository userRepository;
    private final Mapper<Users, InvestorList> investorListMapper;
    @Autowired
    private final AuthService authService;
	
    @GetMapping("/soft-deleted-users")
    public ResponseEntity<Iterable<InvestorList>> getSoftDeletedUsers() {
        Iterable<Users> users =  userRepository.findAllByDeletedTrue();
        Iterable<InvestorList> allUsers = investorListMapper.mapListTo(users);

        return ResponseEntity.ok(allUsers);
   }

    @GetMapping("/active-users")
    public ResponseEntity<Iterable<InvestorList>> getActiveUsers() {
        Iterable<Users> users =  userRepository.findAllActiveUsers();
        Iterable<InvestorList> allUsers = investorListMapper.mapListTo(users);

        return ResponseEntity.ok(allUsers);
    }

    @GetMapping("/pending-deletions")
    public ResponseEntity<Iterable<InvestorList>> getUsersPendingDeletion() {
        LocalDateTime threshold = LocalDateTime.now().minusMonths(3);
        Iterable<Users> users =  userRepository.findUsersInactiveSince(threshold);
        Iterable<InvestorList> allUsers = investorListMapper.mapListTo(users);

        return ResponseEntity.ok(allUsers);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        authService.logout(token.substring(7)); // Remove "Bearer " prefix
        return ResponseEntity.ok("Logged out successfully");
    }


}
