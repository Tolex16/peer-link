package com.plk.peer_link.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserList {

    private Long userId;

    private String fullName;

    private String email;

    private LocalDateTime createdAt;

    private LocalDateTime lastLoggedIn;

    private String role;

}
