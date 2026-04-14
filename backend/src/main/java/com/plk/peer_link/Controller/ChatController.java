package com.plk.peer_link.Controller;

import com.plk.peer_link.Domain.Dto.Chat.ChatMessage;
import com.plk.peer_link.Domain.Entities.ChatThread;
import com.plk.peer_link.Domain.Entities.Message;
import com.plk.peer_link.ExceptionHandler.ChatSentException;
import com.plk.peer_link.Repository.ChatThreadRepository;
import com.plk.peer_link.Repository.MessageRepository;
import com.plk.peer_link.Service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
	
    @Autowired
    private MessageService messageService;

    private final MessageRepository messageRepository;
    private final ChatThreadRepository chatThreadRepository;
    //@MessageMapping("/chat.sendMessage")
    //@SendTo("/topic/public")
	@PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessage chatMessage) {
        String messageThreadId = chatMessage.getThreadId();
        try {
            // Your existing logic to save the message
            Message message = messageService.saveMessage(chatMessage);

            return ResponseEntity.ok("Chat sent successfully. Thread ID: " + message.getThread().getThreadId());
        } catch (IllegalArgumentException e) {
            // Handle any specific exceptions you want to throw manually
            throw new ChatSentException("Chat sent successfully. Thread ID: " + messageThreadId + chatMessage);
        }
    }

	@PostMapping("/add-users/{studentId}/{tutorId}")
    public ResponseEntity<?> addUser(@PathVariable Long studentId, @PathVariable Long tutorId) {
     return ResponseEntity.ok(messageService.addUser(studentId,tutorId));
    }

    @PostMapping("/leave-chat/{studentId}/{tutorId}")
    public ResponseEntity<?> leaveChat(@PathVariable Long studentId, @PathVariable Long tutorId) {
        return ResponseEntity.ok(messageService.leaveChat(studentId, tutorId));
    }

	@GetMapping("/messages/{threadId}")
    public List<Message> getMessages(@PathVariable String threadId) {
        return messageService.getMessagesByThreadId(threadId);
    }
	
	@DeleteMapping("/clear-messages/{threadId}")
    public ResponseEntity<String> clearMessagesByThreadId(@PathVariable String threadId) {
    messageService.deleteMessagesByThreadId(threadId);
    return ResponseEntity.ok("Chat history cleared");
    }

   @DeleteMapping("/clear-message/{threadId}/{id}")
   public ResponseEntity<String> deleteMessageById(@PathVariable String threadId, @PathVariable Long id) {
    boolean deleted = messageService.deleteMessageByIdAndThreadId(id, threadId);
      if (deleted) {
          return ResponseEntity.ok("Message deleted");
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found");
      }
    }
	
	@DeleteMapping("/delete-thread/{threadId}")
    public ResponseEntity<?> deleteThread(@PathVariable String threadId) {
        messageService.deleteThread(threadId);
        return ResponseEntity.ok("ChatThread with threadId: " + threadId + " has been deleted.");
    }


    @GetMapping("/follower-threads")
    public List<ChatThread> getChatThreadsByStudent() {
    return messageService.getChatThreadsByStudent();
    }

    @GetMapping("/following-threads")
    public List<ChatThread> getChatThreadsByTutor() {
        return messageService.getChatThreadsByTutor();
    }
}