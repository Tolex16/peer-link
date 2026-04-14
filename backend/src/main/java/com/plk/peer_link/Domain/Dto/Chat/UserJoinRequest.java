package com.plk.peer_link.Domain.Dto.Chat;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserJoinRequest {
    private Long followerId;
    private Long followingId;
}
