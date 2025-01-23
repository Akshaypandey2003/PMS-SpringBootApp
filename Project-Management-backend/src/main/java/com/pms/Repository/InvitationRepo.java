package com.pms.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Invitation;
import java.util.List;


public interface InvitationRepo extends JpaRepository<Invitation,Long>{

    Invitation findByToken(String token)throws Exception;

    Invitation findByEmail(String userEmail)throws Exception;
    
} 
