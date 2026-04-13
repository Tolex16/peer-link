package com.dcg.digi_cap_group.ForgotPasswordRequest;

import com.dcg.digi_cap_group.Domain.Entities.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "forgot_pass_token")
public class ForgotPassToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String token;

    @ManyToOne(targetEntity = Users.class,fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private Users user;

    @Column(nullable = false)
    private LocalDateTime expireTime;

    @Column(nullable = false)
    private boolean isUsed;
}
