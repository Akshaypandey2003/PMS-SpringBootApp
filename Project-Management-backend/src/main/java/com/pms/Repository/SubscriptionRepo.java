package com.pms.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Subscription;

public interface SubscriptionRepo extends JpaRepository<Subscription, Long> {


    Subscription findByUserId(Long userId);
    
}
