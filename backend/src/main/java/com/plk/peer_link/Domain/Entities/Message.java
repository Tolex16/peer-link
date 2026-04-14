package com.plk.peer_link.Domain.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.plk.peer_link.Domain.Dto.Chat.MessageType;
import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "peer_link_messaging")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_name")
    private String senderFullName;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "receiver_name")
    private String receiverFullName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    @JsonBackReference
    private Users follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    @JsonBackReference
    private Users following;

    @Column(name = "content",  length = 1024)
    private String content;

	@Column(name = "timestamp")
    private LocalDateTime timestamp;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MessageType type;
	
	@ManyToOne
    @JoinColumn(name = "thread_id", nullable = false)
    @JsonBackReference
    private ChatThread thread;
}
