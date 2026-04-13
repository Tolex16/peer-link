package com.dcg.digi_cap_group.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class InvestorProfile {
    private String fullName;
    private String email;
}
