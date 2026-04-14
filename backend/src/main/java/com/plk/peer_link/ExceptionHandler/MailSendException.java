package com.plk.peer_link.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class MailSendException extends RuntimeException {
    public MailSendException(String message){
        super(message);
    }

}
