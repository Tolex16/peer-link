package com.dcg.digi_cap_group.Domain.Entities;

import com.dcg.digi_cap_group.Config.StrongPassword;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name="dcg_users")
@NoArgsConstructor
public class Users implements UserDetails {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true)
    @NotBlank(message = " email cannot be blank")
    @Email(message = "Input a real email address")
    private String email;

    @Column(name = "password")
    @NotNull(message = "Password can't be null")
    @NotBlank(message = " Password cannot be blank")
    @StrongPassword
    @JsonIgnore
    private String password;

    @Column(name = "created_at")
    @CreatedBy
	private LocalDateTime createdAt;
	
	@Column
	private LocalDateTime lastLoggedIn;

    @Column(name = "deleted")
	private boolean deleted = false;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "profile_image", columnDefinition = "bytea")
    private byte[] profileImage;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
