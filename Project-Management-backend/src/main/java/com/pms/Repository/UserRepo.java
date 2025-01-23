package com.pms.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.User;


public interface UserRepo  extends  JpaRepository<User,Long>{

    User findByEmail(String email);
    
} 
