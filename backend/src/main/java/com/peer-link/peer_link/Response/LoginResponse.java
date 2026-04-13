package com.dcg.digi_cap_group.Response;

import com.dcg.digi_cap_group.Domain.Dto.UserDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginResponse {

    @JsonProperty("token")
    private final String token;

    private final UserDto user;
}
