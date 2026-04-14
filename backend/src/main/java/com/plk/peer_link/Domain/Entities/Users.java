package com.plk.peer_link.Domain.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plk.peer_link.Config.StrongPassword;
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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name="peer_link_users")
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
    @NotBlank(message = "email cannot be blank")
    @Email(message = "Input a real email address")
    private String email;
	
    @Column(nullable = false, unique = true)
	@NotBlank(message = "username cannot be blank")
    private String username;

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
	
	@Column(name = "bio", length = 250)
    private String bio;
	
	 // 🔥 Followers (people following THIS user)
    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    // 🔥 Following (people THIS user follows)
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> following = new ArrayList<>();

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
