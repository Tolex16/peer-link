package com.dcg.digi_cap_group.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String message){

        super(message);
    }
}
