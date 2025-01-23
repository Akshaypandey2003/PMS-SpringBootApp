package com.pms.Services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pms.Entities.User;
import com.pms.Repository.UserRepo;

@Service
public class CustomUserDetailsImplementation implements UserDetailsService{

    @Autowired
    private UserRepo userRepo;

    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
    {
        User user = userRepo.findByEmail(username);
        if(user==null)
        {
            throw new UsernameNotFoundException("User not found with email "+username);
        }        

        List<GrantedAuthority>authorities = new ArrayList<>();

        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }

    
    
}
