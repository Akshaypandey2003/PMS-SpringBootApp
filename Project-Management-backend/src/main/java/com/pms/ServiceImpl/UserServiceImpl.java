package com.pms.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.User;
import com.pms.Repository.UserRepo;
import com.pms.Services.UserService;
import com.pms.config.JwtProvider;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepo userRepo;

    //Find User by Jwt Token
    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    //Find User by email
    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepo.findByEmail(email);

        if(user==null){
            throw new Exception("User not found!!");
        }

        return user;
    }

    //Find user with given Id
    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> user = userRepo.findById(userId);
           
        if(user.isEmpty())
        throw new Exception("User Not found!!");
        return user.get();
    }

    //Update number of projects created by user
    @Override
    public User updateUserProjectSize(User user, int number) throws Exception {

        user.setProjectSize(user.getProjectSize()+number);
        
        return userRepo.save(user);

    }
    
}
