package com.plk.peer_link.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserProfile {
    private String fullName;
    private String email;
}
