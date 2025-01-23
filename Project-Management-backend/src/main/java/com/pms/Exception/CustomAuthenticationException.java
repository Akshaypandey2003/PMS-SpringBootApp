package com.pms.Exception;

import com.pms.Response.AuthResponse;

public class CustomAuthenticationException extends RuntimeException {
    private final AuthResponse authResponse;

    public CustomAuthenticationException(AuthResponse authResponse) {
        this.authResponse = authResponse;
    }

    public AuthResponse getAuthResponse() {
        return authResponse;
    }
}