package com.plk.peer_link.Service;


import com.plk.peer_link.Domain.Dto.Chat.ChatMessage;
import com.plk.peer_link.Domain.Entities.ChatThread;
import com.plk.peer_link.Domain.Entities.Message;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MessageService {
    Message saveMessage(ChatMessage chatMessage);

    void sendMessage(ChatMessage chatMessage);

    List<ChatThread> getChatThreadsByTutor();
    List<ChatThread> getChatThreadsByStudent();
    ResponseEntity<ChatMessage> addUser(Long studentId, Long tutorId);
    ResponseEntity<ChatMessage> leaveChat(Long studentId, Long tutorId);
    List<Message> getMessagesByThreadId(String threadId);

    void deleteMessagesByThreadId(String threadId);
	
	void deleteThread(String threadId);

    boolean deleteMessageByIdAndThreadId(Long id, String threadId);
}
