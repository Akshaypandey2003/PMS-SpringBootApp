package com.pms.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Chat;

public interface ChatRepo extends JpaRepository<Chat,Long>{

    
} 
