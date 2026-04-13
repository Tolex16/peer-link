package com.dcg.digi_cap_group.ExceptionHandler;

public class VerificationException extends RuntimeException {
    public VerificationException(String message) { super(message); }
    public VerificationException(String message, Throwable cause) { super(message, cause); }
}
