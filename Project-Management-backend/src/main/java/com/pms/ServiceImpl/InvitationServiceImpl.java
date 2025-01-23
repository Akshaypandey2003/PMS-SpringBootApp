package com.pms.ServiceImpl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Invitation;
import com.pms.Exception.CustomInvitationException;
import com.pms.Repository.InvitationRepo;
import com.pms.Response.MessageResponse;
import com.pms.Services.EmailService;
import com.pms.Services.InvitationService;
import com.pms.Services.UserService;

@Service
public class InvitationServiceImpl implements InvitationService{
   
    @Autowired
    private InvitationRepo invitationRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;


    //Sending Invitation
    @Override
    public void sendInvitation(String email, Long projectId) throws Exception {

     String invitationToken = UUID.randomUUID().toString();

     Invitation invitation = new Invitation();

     invitation.setEmail(email);
     invitation.setProjectId(projectId);
     invitation.setToken(invitationToken);
     invitation.setCreatedAt(LocalDateTime.now());

     invitationRepo.save(invitation);

     String invitaionLink = "http://localhost:5173/accept_invitation?token="+invitationToken;
     emailService.sendEmailWithToken(email, invitaionLink);

    }
    
    //Accepting Invitation
    @Override
    public Invitation acceptInvitation(String token, Long userId) throws Exception 
    {
        Invitation invitation = invitationRepo.findByToken(token);

        if(invitation==null){
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage("Invalid Invitation Token!!");
            throw new CustomInvitationException(messageResponse);
        }
        String userEmail = userService.findUserById(userId).getEmail();

        //validate email
        if(!invitation.getEmail().equals(userEmail))
        {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage("Unauthorized access!!");
            throw new CustomInvitationException(messageResponse);
        }
        // Check expiration (24 hours validity)
        LocalDateTime expirationTime = invitation.getCreatedAt().plusHours(24);

        if(LocalDateTime.now().isAfter(expirationTime))
        {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage("Invitation link has expired!!");
            throw new CustomInvitationException(messageResponse);
        }
        //To make the invitation invalid once excepted!!
        invitationRepo.delete(invitation);
        
        return invitation;
    }

    //Extract token required for invitation acceptance
    @Override
    public String getTokenByUserMail(String userEmail) throws Exception {

        Invitation invitation = invitationRepo.findByEmail(userEmail);
        
        if(invitation==null)
        {
            throw new Exception("No Invitation found with "+userEmail);
        }
        return invitation.getToken();
       
    }

    //Deleting token 
    @Override
    public void deleteToken(String token) throws Exception {

        Invitation invitation = invitationRepo.findByToken(token);
        invitationRepo.delete(invitation);
    }
    
}
