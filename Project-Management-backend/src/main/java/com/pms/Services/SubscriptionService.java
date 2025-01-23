package com.pms.Services;


import com.pms.Entities.PlanType;
import com.pms.Entities.Subscription;
import com.pms.Entities.User;

public interface SubscriptionService {
    
    Subscription createSubscription(User user);
    
    Subscription getUserSubscription(Long userId)throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isPlanValid(Subscription subscription);

}
