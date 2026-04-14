package com.plk.peer_link.Repository;

import com.plk.peer_link.Domain.Entities.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatThreadRepository extends JpaRepository<ChatThread, Long> {
    Optional<ChatThread> findByThreadId(String threadId);

    List<ChatThread> findAllByStudent_StudentId(Long studentId);
    
    List<ChatThread> findAllByTutor_TutorId(Long tutorId);

    void deleteByThreadId(String threadId);
}