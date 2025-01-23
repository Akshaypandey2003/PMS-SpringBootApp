package com.pms.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.pms.Response.AuthResponse;
import com.pms.Response.MessageResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomAuthenticationException.class)
    public ResponseEntity<AuthResponse> handleCustomAuthenticationException(CustomAuthenticationException ex) {
        return new ResponseEntity<>(ex.getAuthResponse(), HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(CustomInvitationException.class)
    public ResponseEntity<MessageResponse> handleCustomInvitationException(CustomInvitationException ex)
    {
        return new ResponseEntity<>(ex.getMessageResponse(),HttpStatus.UNAUTHORIZED);
    }
}
