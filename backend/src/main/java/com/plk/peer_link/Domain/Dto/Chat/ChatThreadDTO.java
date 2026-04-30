package com.proliferate.Proliferate.Domain.DTO.Chat;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatThreadDTO {
	
    private String threadId;
	
	  private String lastMessage;
    private LocalDateTime lastMessageTime;
    private int unreadCount;
    private UserDTO otherUser;
    
	private List<ChatMessage> messages;
}
