package com.plk.peer_link.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.OK)
public class ChatSentException extends RuntimeException{
    public ChatSentException(String message){
        super(message);
    }
}
