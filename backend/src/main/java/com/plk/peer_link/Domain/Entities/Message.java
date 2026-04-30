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
@Table(name = "messages",
       indexes = {
           @Index(name = "idx_thread", columnList = "thread_id"),
           @Index(name = "idx_sender", columnList = "sender_id")
       })
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
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonBackReference
    private Users sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    @JsonBackReference
    private Users receiver;

    @Column(name = "content",  length = 2500)
    private String content;
	
	private boolean isRead = false;

	@Column(name = "timestamp")
    private LocalDateTime timestamp;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MessageType type;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id", nullable = false)
    @JsonBackReference
    private ChatThread thread;
	
	private LocalDateTime createdAt = LocalDateTime.now();
}
