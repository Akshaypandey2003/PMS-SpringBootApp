package com.pms.Services;

import java.util.List;

import com.pms.Entities.Message;

public interface MessageService {
    
    Message sendMessage(Long senderId,Long projectId,String content)throws Exception;
    List<Message> getMessagesByProjectId(Long projectId)throws Exception;
}
