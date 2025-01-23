package com.pms.ServiceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Chat;
import com.pms.Entities.Message;
import com.pms.Entities.Project;
import com.pms.Entities.User;
import com.pms.Repository.MessageRepo;
import com.pms.Repository.UserRepo;
import com.pms.Services.MessageService;
import com.pms.Services.ProjectService;

@Service
public class MessageServiceImpl implements MessageService{


    @Autowired
    MessageRepo messageRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ProjectService projectService;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
       User sender = userRepo.findById(senderId).orElseThrow(()->
        new Exception("User not found with id: "+ senderId)
       );

       Chat chat = projectService.getProjectById(projectId).getChat();
       
       Message message = new Message();
       message.setContent(content);
       message.setChat(chat);
       message.setSender(sender);
       message.setCreatedAt(LocalDateTime.now());

       Message savedMessage = messageRepo.save(message);
       
       chat.getMessages().add(savedMessage);
       
       return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception {
       
        Chat chat = projectService.getChatByProjectId(projectId);

        List<Message> messages = messageRepo.findByChatIdOrderByCreatedAtAsc(chat.getId());

        return messages;
    }
    
}
