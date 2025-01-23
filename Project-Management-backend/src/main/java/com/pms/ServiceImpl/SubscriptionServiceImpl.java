package com.pms.ServiceImpl;

import com.pms.Entities.Subscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.PlanType;
import com.pms.Entities.User;
import com.pms.Repository.SubscriptionRepo;
import com.pms.Services.SubscriptionService;
import com.pms.Services.UserService;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{

    @Autowired
    private SubscriptionRepo subscriptionRepo;

    @Autowired
    private UserService userService;
    
    @Override
    public Subscription createSubscription(User user) {
       
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlanType(PlanType.FREE);
        subscription.setPlanValid(true);
        subscription.setSubscriptionStartDate(java.time.LocalDate.now());
        subscription.setSubscriptionEndDate(java.time.LocalDate.now().plusMonths(1));

        return subscriptionRepo.save(subscription);
    }

    @Override
    public Subscription getUserSubscription(Long userId) throws Exception {
        Subscription subscription = subscriptionRepo.findByUserId(userId);
        if(!isPlanValid(subscription))
        {
            subscription.setPlanType(PlanType.FREE);
            subscription.setSubscriptionStartDate(java.time.LocalDate.now());
            subscription.setSubscriptionEndDate(java.time.LocalDate.now().plusMonths(12));
        }
        return subscriptionRepo.save(subscription);
    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) {

        Subscription subscription = subscriptionRepo.findByUserId(userId);

        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(java.time.LocalDate.now());

        int months = 0;

         if(planType.equals(PlanType.MONTHLY)){
            months = 1;
        }else if(planType.equals(PlanType.ANNUALLY)){
            months = 12;
        }
        subscription.setSubscriptionEndDate(java.time.LocalDate.now().plusMonths(months));

       return subscriptionRepo.save(subscription);
    }

    @Override
    public boolean isPlanValid(com.pms.Entities.Subscription subscription) {
      
        if(subscription.getPlanType().equals(PlanType.FREE))
        {
            return true;
        }
        if(subscription.getSubscriptionEndDate().isBefore(java.time.LocalDate.now()))
        {
            subscription.setPlanValid(false);
            subscriptionRepo.save(subscription);
        }
        return subscription.isPlanValid()?true:false;
    }

  
}
