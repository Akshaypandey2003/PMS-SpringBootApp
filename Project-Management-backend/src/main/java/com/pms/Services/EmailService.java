package com.pms.Services;

import org.springframework.stereotype.Service;


public interface EmailService 
{
    void sendEmailWithToken(String userEmail,String link)throws Exception;
}
