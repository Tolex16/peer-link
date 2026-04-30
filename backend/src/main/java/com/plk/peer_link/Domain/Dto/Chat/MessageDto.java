package com.plk.peer_link.Domain.Dto.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class MessageDto {
    private Long id;
    private String content;
    private String type; // text, image, video, audio
    private String mediaUrl;
    private Long senderId;
    private String senderName;
    private LocalDateTime createdAt;
    private boolean seen;
    private LocalDateTime seenAt;
}
