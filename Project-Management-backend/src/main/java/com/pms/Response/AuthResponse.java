package com.pms.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
     private String jwt;
     private String msg;
     private String nameError;
     private String emailError;
     private String passwordError;
     private String userError;
}
