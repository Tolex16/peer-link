package com.plk.peer_link.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.plk.peer_link.Domain.Dto.UserDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginResponse {

    @JsonProperty("token")
    private final String token;

    private final UserDto user;
}
