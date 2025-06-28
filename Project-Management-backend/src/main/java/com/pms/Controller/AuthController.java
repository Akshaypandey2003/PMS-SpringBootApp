package com.pms.Controller;

import java.util.regex.Pattern;
import java.util.regex.Matcher;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.User;
import com.pms.Exception.CustomAuthenticationException;
import com.pms.Repository.UserRepo;
import com.pms.Request.LoginRequest;
import com.pms.Response.AuthResponse;
import com.pms.Services.CustomUserDetailsImplementation;
import com.pms.Services.SubscriptionService;
import com.pms.config.JwtProvider;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private CustomUserDetailsImplementation customUserDetailsImplementation;

  @Autowired
  private SubscriptionService subscriptionService;

  // Sign Up handler-------->
  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> createUserHandler(@Validated @RequestBody User user) throws Exception {
   

    // Validate email format
    if (!isValidEmail(user.getEmail())) {
      AuthResponse authResponse = new AuthResponse();
      authResponse.setEmailError("Invalid email format!!");
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
  }

    //Validate Name format
    if (!isValidName(user.getName())) {
      AuthResponse authResponse = new AuthResponse();
      authResponse.setNameError("Invalid Name!!");
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    //Validate password
    if (!isValidPassword(user.getPassword())) {
      AuthResponse authResponse = new AuthResponse();
      authResponse.setPasswordError("Invalid Password!!");
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
  }

    User isUserExist = userRepo.findByEmail(user.getEmail());

    if (isUserExist != null) {
      AuthResponse authResponse = new AuthResponse();
      authResponse.setUserError("User Already exists with this email !! Please use another one");
      return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }
   
    User user2 = new User();

    user2.setEmail(user.getEmail());
    user2.setName(sanitizeName(user.getName()));
    user2.setPassword(passwordEncoder.encode(user.getPassword()));

    User savedUser = userRepo.save(user2);

    subscriptionService.createSubscription(savedUser);

    Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = JwtProvider.generateToken(authentication);

    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(jwt);
    authResponse.setMsg("Signup success..");

    return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
  }

  // -------------- Sign in handler ----------------------
  @PostMapping("/signin")
  public ResponseEntity<AuthResponse> signIn(@Validated @RequestBody  LoginRequest loginReq) 
  {
    if (!isValidEmail(loginReq.getEmail())) {
      AuthResponse authResponse = new AuthResponse();
      authResponse.setEmailError("Invalid email format!!");
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
  }
  if (!isValidPassword(loginReq.getPassword())) {
    AuthResponse authResponse = new AuthResponse();
    authResponse.setPasswordError("Invalid Password!!");
    return new ResponseEntity<>(authResponse, HttpStatus.OK);
}

    String username = loginReq.getEmail();
    String password = loginReq.getPassword();


    Authentication authentication = authenticate(username, password);
    System.out.println("Inside signin handler this is authentication process output:"+authentication);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = JwtProvider.generateToken(authentication);

    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(jwt);
    authResponse.setMsg("Sign In success..");

    return new ResponseEntity<>(authResponse, HttpStatus.OK);
  }

  private Authentication authenticate(String username, String password) 
  {
    UserDetails userDetails = customUserDetailsImplementation.loadUserByUsername(username);
    if (userDetails == null)
    {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setUserError("User not found!!");
        throw new CustomAuthenticationException(authResponse);
    }
    if (!passwordEncoder.matches(password, userDetails.getPassword()))
     { 
      AuthResponse authResponse = new AuthResponse();
        authResponse.setPasswordError("Wrong Password!!");
        throw new CustomAuthenticationException(authResponse);
     }

    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

  }

  // Email validation regex
  private boolean isValidEmail(String email) {
    String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,}$";
    Pattern pattern = Pattern.compile(emailRegex);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
}
  // Namevalidation regex
  private boolean isValidName(String name) {
    String nameRegex = "^[a-zA-Z ]{4,15}$";
    Pattern pattern = Pattern.compile(nameRegex);
    Matcher matcher = pattern.matcher(name);
    return matcher.matches();
}

// Password validation regex (minimum requirements)
private boolean isValidPassword(String password) {
    return password.length() >= 6;
    //  &&
    //        password.matches(".*[A-Z].*") &&
    //        password.matches(".*[a-z].*") &&
    //        password.matches(".*\\d.*") &&
    //        password.matches(".*[@$!%*?&#].*");
}

// Name sanitization method (strip unwanted characters, e.g., HTML tags)
private String sanitizeName(String name) {
    return name.replaceAll("[^a-zA-Z ]", "").trim(); // Remove any non-alphabet characters (except space)
}
}
