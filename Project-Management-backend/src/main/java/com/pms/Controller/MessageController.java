package com.pms.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.Chat;
import com.pms.Entities.Message;
import com.pms.Entities.User;
import com.pms.Request.CreateMessageRequest;
import com.pms.Services.MessageService;
import com.pms.Services.ProjectService;
import com.pms.Services.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
       @RequestBody CreateMessageRequest createMessageRequest
    )throws Exception
     {

        User user = userService.findUserById(createMessageRequest.getSenderId());

        Chat  chat = projectService.getProjectById(createMessageRequest.getProjectId()).getChat();

        if(chat==null)
        throw new Exception("Chat not found");

        Message sendMessage = messageService.sendMessage(createMessageRequest.getSenderId(), 
        createMessageRequest.getProjectId(), createMessageRequest.getContent());


        return ResponseEntity.ok(sendMessage);
    }
    
    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByProjectId(
        @PathVariable Long projectId
    ) throws Exception
    {
        List<Message> messages = messageService.getMessagesByProjectId(projectId);

        return ResponseEntity.ok(messages);
    }

}
