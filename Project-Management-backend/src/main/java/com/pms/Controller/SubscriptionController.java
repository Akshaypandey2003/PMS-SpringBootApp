package com.pms.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.PlanType;
import com.pms.Entities.Subscription;
import com.pms.Entities.User;
import com.pms.Services.SubscriptionService;
import com.pms.Services.UserService;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController 
{
    @Autowired
    private SubscriptionService subscriptionService;
    
    @Autowired
    private UserService userService;
   
    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(
        @RequestHeader("Authorization") String jwtToken) throws Exception
    {
        User user = userService.findUserProfileByJwt(jwtToken);

        Subscription subscription = subscriptionService.getUserSubscription(user.getId());

        return ResponseEntity.ok(subscription);
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> updateUserSubscription(
        @RequestParam PlanType planType,
        @RequestHeader("Authorization") String jwtToken) throws Exception
    {
        User user = userService.findUserProfileByJwt(jwtToken);

        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(), planType);

        return ResponseEntity.ok(subscription);
    }
}
