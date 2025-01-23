package com.pms.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Message;

public interface MessageRepo extends JpaRepository<Message,Long> {

    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId);
    
}
