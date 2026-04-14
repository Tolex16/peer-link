package com.plk.peer_link.Service.Impl;

import com.plk.peer_link.Domain.Entities.Follow;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Repository.FollowRepository;
import com.plk.peer_link.Repository.UserRepository;
import com.plk.peer_link.Service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public void followUser(Long followerId, Long targetUserId) {

        if (followerId.equals(targetUserId)) {
            throw new RuntimeException("You cannot follow yourself");
        }

        if (followRepository.existsByFollowerIdAndFollowingId(followerId, targetUserId)) {
            throw new RuntimeException("Already following this user");
        }

        Users follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Users following = userRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        followRepository.save(follow);
    }

    public void unfollowUser(Long followerId, Long targetUserId) {

        Follow follow = followRepository
                .findByFollowerIdAndFollowingId(followerId, targetUserId)
                .orElseThrow(() -> new RuntimeException("Follow relationship not found"));

        followRepository.delete(follow);
    }

    public List<Users> getFollowers(Long userId) {
        return followRepository.findByFollowingId(userId)
                .stream()
                .map(Follow::getFollower)
                .toList();
    }

    public List<Users> getFollowing(Long userId) {
        return followRepository.findByFollowerId(userId)
                .stream()
                .map(Follow::getFollowing)
                .toList();
    }
}