package com.plk.peer_link.Controller;


import com.plk.peer_link.Service.FollowService;
import com.plk.peer_link.Service.JwtService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @Autowired
    private final JwtService jwtService;

    @PostMapping("/follow-user/{userId}")
    public ResponseEntity<?> followUser(
            @PathVariable Long userId) {

        Long currentUserId = jwtService.getUserId();

        followService.followUser(currentUserId, userId);

        return ResponseEntity.ok("Followed successfully");
    }

    @DeleteMapping("/unfollow-user/{userId}")
    public ResponseEntity<?> unfollowUser(
            @PathVariable Long userId) {

        Long currentUserId = jwtService.getUserId();

        followService.unfollowUser(currentUserId, userId);

        return ResponseEntity.ok("Unfollowed successfully");
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowers(userId));
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<?> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowing(userId));
    }
}