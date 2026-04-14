package com.plk.peer_link.Service;


import com.plk.peer_link.Domain.Entities.Users;

import java.util.List;

public interface FollowService {
    void followUser(Long followerId, Long targetUserId);

    void unfollowUser(Long followerId, Long targetUserId);

    List<Users> getFollowers(Long userId);

    List<Users> getFollowing(Long userId);
}
