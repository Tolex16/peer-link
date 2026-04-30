package com.plk.peer_link.Domain.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "chat_threads",
       indexes = @Index(name = "idx_thread_users", columnList = "user_one_id, user_two_id", unique = true))

public class ChatThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "thread_id", unique = true, nullable = false)
    private String threadId;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_one_id", nullable = false)
    @JsonBackReference
	private User userOne;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_two_id", nullable = false)
    @JsonBackReference
    private User userTwo;
	
	   // 🔥 LAST MESSAGE (FAST FEED)
    private String lastMessage;

    private LocalDateTime lastMessageTime;

    // 🔥 UNREAD COUNTS (per user)
    private int userOneUnreadCount = 0;
    private int userTwoUnreadCount = 0;

	
	private LocalDateTime createdAt = LocalDateTime.now();
}
