package com.plk.peer_link.Service.Impl;

import com.plk.peer_link.Domain.Dto.Chat.ChatMessage;
import com.plk.peer_link.Domain.Dto.Chat.MessageType;
import com.plk.peer_link.Domain.Entities.ChatThread;
import com.plk.peer_link.Domain.Entities.Message;
import com.plk.peer_link.Repository.ChatThreadRepository;
import com.plk.peer_link.Repository.FollowRepository;
import com.plk.peer_link.Repository.MessageRepository;
import com.plk.peer_link.Repository.UserRepository;
import com.plk.peer_link.Service.JwtService;
import com.plk.peer_link.Service.MessageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    private final FollowRepository followRepository;
    private final ChatThreadRepository chatThreadRepository;

    @Autowired
    private final JwtService jwtService;

    /**
     * Save a chat message to the database.
     */
	 @Transactional
    public Message saveMessage(ChatMessage chatMessage) {
    // Retrieve or Create Chat Thread
    ChatThread thread = chatThreadRepository.findByThreadId(chatMessage.getThreadId())
        .orElseGet(() -> {
            ChatThread newThread = new ChatThread();
            newThread.setThreadId(UUID.randomUUID().toString().substring(0, 6));

            StudentEntity student = studentRepository.findById(chatMessage.getSenderId()).orElse(null);
            TutorEntity tutor = tutorRepository.findById(chatMessage.getReceiverId()).orElse(null);

            if (student == null && tutor == null) {
                student = studentRepository.findById(chatMessage.getReceiverId()).orElseThrow(() -> new UserNotFoundException("Student not found"));
                tutor = tutorRepository.findById(chatMessage.getSenderId()).orElseThrow(() -> new UserNotFoundException("Tutor not found"));
            } else if (student == null) {
                student = studentRepository.findById(chatMessage.getReceiverId()).orElseThrow(() -> new UserNotFoundException("Student not found"));
            } else if (tutor == null) {
                tutor = tutorRepository.findById(chatMessage.getSenderId()).orElseThrow(() -> new UserNotFoundException("Tutor not found"));
            }

            newThread.setStudent(student);
            newThread.setTutor(tutor);

            return chatThreadRepository.save(newThread);
        });

    // Extract the student and tutor involved in this thread
    StudentEntity student = thread.getStudent();
    TutorEntity tutor = thread.getTutor();

    if (!threadHasUser(thread, student.getStudentId(), tutor.getTutorId())) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid chat thread for the provided user IDs.");
    }

    // Validate that the sender and receiver IDs match the student and tutor in this thread
    Long senderId = chatMessage.getSenderId();
    Long receiverId = chatMessage.getReceiverId();

    boolean isValidSender = senderId.equals(student.getStudentId()) || senderId.equals(tutor.getTutorId());
    boolean isValidReceiver = receiverId.equals(student.getStudentId()) || receiverId.equals(tutor.getTutorId());

    if (!isValidSender || !isValidReceiver) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Sender or receiver is not authorized in this chat thread.");
    }

    Message message = new Message();
    message.setFollower(student);
    message.setFollowing(tutor);

    // Set the correct full names based on actual sender and receiver roles
    if (senderId.equals(student.getStudentId())) {
        message.setSenderFullName(student.getFirstName() + " " + student.getLastName());
        message.setReceiverFullName(tutor.getFirstName() + " " + tutor.getLastName());
    } else {
        message.setSenderFullName(tutor.getFirstName() + " " + tutor.getLastName());
        message.setReceiverFullName(student.getFirstName() + " " + student.getLastName());
    }

    message.setSenderId(chatMessage.getSenderId());
    message.setContent(chatMessage.getContent());
    message.setTimestamp(LocalDateTime.now());
    message.setThread(thread);
    message.setType(MessageType.CHAT);

    return messageRepository.save(message);
}


   private boolean threadHasUser(ChatThread thread, Long studentId, Long tutorId) {
    StudentEntity threadStudent = thread.getStudent();
    TutorEntity threadTutor = thread.getTutor();

    if (Objects.equals(threadStudent.getStudentId(), studentId) && Objects.equals(threadTutor.getTutorId(), tutorId)) {
        return true;
    }

    for (Message message : thread.getMessages()) {
        if (Objects.equals(message.getStudent().getStudentId(), studentId)
            && Objects.equals(message.getTutor().getTutorId(), tutorId)) {
            return true;
        }
    }

    return false;
    }
	public List<Message> getMessagesByThreadId(String threadId) {
        return messageRepository.findByThread_ThreadId(threadId);
    }

public ResponseEntity<ChatMessage> addUser(@PathVariable Long studentId, @PathVariable Long tutorId) {
    // Fetch the student and tutor entities based on the provided IDs
    StudentEntity student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

    TutorEntity tutor = tutorRepository.findById(tutorId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tutor not found"));

    // Create a ChatMessage for the response
    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setContent(student.getFirstName() + " " + student.getLastName() + " joined the chat.<br>" +
                   tutor.getFirstName() + " " + tutor.getLastName() + " joined the chat.");

    chatMessage.setTimestamp(String.valueOf(LocalDateTime.now()));
    chatMessage.setType(MessageType.JOIN);

    return ResponseEntity.ok(chatMessage);
}

   public ResponseEntity<ChatMessage> leaveChat(Long studentId, Long tutorId) {
    // Fetch the student and tutor entities based on the provided IDs
    StudentEntity student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

    TutorEntity tutor = tutorRepository.findById(tutorId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tutor not found"));

    // Create a ChatMessage for the response
    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setContent(student.getFirstName() + " " + student.getLastName() + " left the chat.<br>" +
                   tutor.getFirstName() + " " + tutor.getLastName() + " left the chat.");

    chatMessage.setTimestamp(String.valueOf(LocalDateTime.now()));
    chatMessage.setType(MessageType.LEAVE);

    return ResponseEntity.ok(chatMessage);
   }

   public void deleteMessagesByThreadId(String threadId) {
    List<Message> messages = messageRepository.findByThread_ThreadId(threadId);
    if (!messages.isEmpty()) {
        messageRepository.deleteAll(messages);
    }
   }

   public boolean deleteMessageByIdAndThreadId(Long id, String threadId) {
    Optional<Message> messageOpt = messageRepository.findByIdAndThread_ThreadId(id, threadId);
    if (messageOpt.isPresent()) {
        messageRepository.delete(messageOpt.get());
        return true;
    }
    return false;
   }
   
    @Transactional
    public void deleteThread(String threadId) {
        List<Message> remainingMessages = messageRepository.findByThread_ThreadId(threadId);

        if (!remainingMessages.isEmpty()) {
            throw new IllegalStateException("Messages still exist for this thread. Clear messages first.");
        }

        Optional<ChatThread> chatThreadOpt = chatThreadRepository.findByThreadId(threadId);
        if (chatThreadOpt.isPresent()) {
            chatThreadRepository.deleteByThreadId(threadId);
        } else {
            throw new EntityNotFoundException("Chat not found with threadId: " + threadId);
        }
    }

     // 🔥 CREATE OR GET THREAD
    private ChatThread getOrCreateThread(Long user1Id, Long user2Id) {

        return chatThreadRepository
            .findByUserOneIdAndUserTwoIdOrUserOneIdAndUserTwoId(
                user1Id, user2Id, user2Id, user1Id
            )
            .orElseGet(() -> {
                User user1 = userRepository.findById(user1Id)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                User user2 = userRepository.findById(user2Id)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                ChatThread thread = ChatThread.builder()
                        .threadId(UUID.randomUUID().toString())
                        .userOne(user1)
                        .userTwo(user2)
                        .build();

                return chatThreadRepository.save(thread);
            });
    }

    // 🔥 SEND MESSAGE
    @Transactional
    public Message sendMessage(Long receiverId, String content) {

        Long senderId = jwtService.getUserId();

        if (senderId.equals(receiverId)) {
            throw new RuntimeException("Cannot message yourself");
        }

        ChatThread thread = getOrCreateThread(senderId, receiverId);

        User sender = userRepository.findById(senderId).orElseThrow();
        User receiver = userRepository.findById(receiverId).orElseThrow();

        Message message = Message.builder()
                .content(content)
                .sender(sender)
                .receiver(receiver)
                .thread(thread)
                .build();

        Message savedMessage = messageRepository.save(message);

    // 🔥 UPDATE THREAD (VERY IMPORTANT)
    thread.setLastMessage(content);
    thread.setLastMessageTime(LocalDateTime.now());

    // 🔥 UNREAD COUNT LOGIC
    if (thread.getUserOne().getId().equals(senderId)) {
        thread.setUserTwoUnreadCount(thread.getUserTwoUnreadCount() + 1);
    } else {
        thread.setUserOneUnreadCount(thread.getUserOneUnreadCount() + 1);
    }

    chatThreadRepository.save(thread);

    return savedMessage;
    }
	
	 // 🔥 GET THREAD MESSAGES(PAGINATED)
	public Page<Message> getMessages(String threadId, int page, int size) {

    Pageable pageable = PageRequest.of(page, size);

    return messageRepository
            .findByThread_ThreadIdOrderByCreatedAtDesc(threadId, pageable);
    }

     // 🔥 GET THREAD MESSAGES
    public List<Message> getMessages(String threadId) {
        return messageRepository.findByThread_ThreadIdOrderByCreatedAtAsc(threadId);
    }

    // 🔥 GET USER THREADS
    public List<ChatThread> getUserThreads() {
        Long userId = jwtService.getUserId();
        return chatThreadRepository.findByUserOneIdOrUserTwoId(userId, userId);
    }
	
	// 🔥 GET USER THREADS (WITH SORTING)
	public List<ChatThread> getUserThreads() {

    Long userId = jwtService.getUserId();

    return chatThreadRepository
            .findByUserOneIdOrUserTwoId(userId, userId)
            .stream()
            .sorted(Comparator.comparing(ChatThread::getLastMessageTime).reversed())
            .toList();
}

    // 🔥 DELETE MESSAGE
    public void deleteMessage(Long messageId, String threadId) {
        Message message = messageRepository
                .findByIdAndThread_ThreadId(messageId, threadId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        Long currentUser = jwtService.getUserId();

        if (!message.getSender().getId().equals(currentUser)) {
            throw new RuntimeException("Unauthorized");
        }

        messageRepository.delete(message);
    }

    // 🔥 DELETE THREAD
    @Transactional
    public void deleteThread(String threadId) {
        ChatThread thread = chatThreadRepository.findByThreadId(threadId)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        messageRepository.deleteAll(
                messageRepository.findByThread_ThreadIdOrderByCreatedAtAsc(threadId)
        );

        chatThreadRepository.delete(thread);
    }
	
	
	public void markAsSeen(String threadId) {
    Long userId = jwtService.getUserId();

    List<Message> messages = messageRepository
        .findUnseenMessages(threadId, userId);

    messages.forEach(msg -> {
        msg.setSeen(true);
        msg.setSeenAt(LocalDateTime.now());
    });

    messageRepository.saveAll(messages);
}

    @Transactional
public void markAsRead(String threadId) {

    Long userId = jwtService.getUserId();

    ChatThread thread = chatThreadRepository.findByThreadId(threadId)
            .orElseThrow(() -> new RuntimeException("Thread not found"));

    // Reset unread count
    if (thread.getUserOne().getId().equals(userId)) {
        thread.setUserOneUnreadCount(0);
    } else {
        thread.setUserTwoUnreadCount(0);
    }

    // Mark messages as read
    List<Message> messages = messageRepository
            .findByThread_ThreadIdOrderByCreatedAtDesc(threadId);

    messages.forEach(msg -> {
        if (msg.getReceiver().getId().equals(userId)) {
            msg.setRead(true);
        }
    });

    messageRepository.saveAll(messages);
}


}
