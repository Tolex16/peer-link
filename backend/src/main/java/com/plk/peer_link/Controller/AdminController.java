package com.plk.peer_link.Controller;

import com.plk.peer_link.Domain.Dto.UserList;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Domain.Mappers.Mapper;
import com.plk.peer_link.Repository.UserRepository;
import com.plk.peer_link.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
	
    private final UserRepository userRepository;
    private final Mapper<Users, UserList> investorListMapper;
    @Autowired
    private final AuthService authService;
	
    @GetMapping("/soft-deleted-users")
    public ResponseEntity<Iterable<UserList>> getSoftDeletedUsers() {
        Iterable<Users> users =  userRepository.findAllByDeletedTrue();
        Iterable<UserList> allUsers = investorListMapper.mapListTo(users);

        return ResponseEntity.ok(allUsers);
   }

    @GetMapping("/active-users")
    public ResponseEntity<Iterable<UserList>> getActiveUsers() {
        Iterable<Users> users =  userRepository.findAllActiveUsers();
        Iterable<UserList> allUsers = investorListMapper.mapListTo(users);

        return ResponseEntity.ok(allUsers);
    }

    @GetMapping("/pending-deletions")
    public ResponseEntity<Iterable<UserList>> getUsersPendingDeletion() {
        LocalDateTime threshold = LocalDateTime.now().minusMonths(3);
        Iterable<Users> users =  userRepository.findUsersInactiveSince(threshold);
        Iterable<UserList> allUsers = investorListMapper.mapListTo(users);

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
