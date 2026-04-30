package com.plk.peer_link.Repository;

import com.plk.peer_link.Domain.Entities.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatThreadRepository extends JpaRepository<ChatThread, Long> {
    Optional<ChatThread> findByThreadId(String threadId);

    Optional<ChatThread> findByUserOneIdAndUserTwoId(Long u1, Long u2);

    Optional<ChatThread> findByUserOneIdAndUserTwoIdOrUserOneIdAndUserTwoId(
        Long u1, Long u2, Long u2Alt, Long u1Alt
    );

    List<ChatThread> findByUserOneIdOrUserTwoId(Long u1, Long u2);

    void deleteByThreadId(String threadId);
}