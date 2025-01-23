package com.pms.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.User;
import com.pms.Services.UserService;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(
        @RequestHeader("Authorization") String jwtToken
    ) throws Exception
    {
        User user = userService.findUserProfileByJwt(jwtToken);
        
        return ResponseEntity.ok(user);
       
    }
   
    
}
