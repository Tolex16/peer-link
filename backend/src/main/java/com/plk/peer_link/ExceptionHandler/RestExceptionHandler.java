package com.plk.peer_link.ExceptionHandler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(
            new ErrorResponse("BAD_REQUEST", ex.getMessage())
        );
    }
    record ErrorResponse(String code, String message) {}
}