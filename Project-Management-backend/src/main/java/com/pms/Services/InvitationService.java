package com.pms.Services;

import com.pms.Entities.Invitation;

public interface InvitationService {
    
    public void sendInvitation(String email, Long projectId) throws Exception;

    public Invitation acceptInvitation(String token,Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail)throws Exception;

    void deleteToken(String token)throws Exception;
}
