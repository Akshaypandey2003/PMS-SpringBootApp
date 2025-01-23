package com.pms.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Chat;
import com.pms.Repository.ChatRepo;
import com.pms.Services.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepo chatRepo;

    //Creating a chat 
    @Override
    public Chat createChat(Chat chat) {
       
        return chatRepo.save(chat);
    }
    
}
