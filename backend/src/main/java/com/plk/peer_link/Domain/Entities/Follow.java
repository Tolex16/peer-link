package com.plk.peer_link.Domain.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "follows",
       uniqueConstraints = @UniqueConstraint(columnNames = {"follower_id", "following_id"}),
       indexes = {
           @Index(name = "idx_follower", columnList = "follower_id"),
           @Index(name = "idx_following", columnList = "following_id")
       })
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Follow {

    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long followId;

    // 👤 The user who follows
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private Users follower;

    // 👤 The user being followed
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    private Users following;

    @Column(name = "followed_at")
    @CreatedBy
    private LocalDateTime followedAt;
}
