package com.dqa.digi_quantum_analytics.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvestorList {

    private Long userId;

    private String fullName;

    private String email;

    private LocalDateTime createdAt;

    private LocalDateTime lastLoggedIn;

    private String role;

    private boolean DigiFutrTrade;

}
