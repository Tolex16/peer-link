package com.plk.peer_link.Domain.Dto.Chat;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class SendMessageRequest {
    private String threadId;
    private String content;
    private String type;
    private String mediaUrl;
}