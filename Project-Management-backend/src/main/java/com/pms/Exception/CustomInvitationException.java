package com.pms.Exception;

import com.pms.Response.MessageResponse;

public class CustomInvitationException extends RuntimeException
{
    final MessageResponse messageResponse;
    public CustomInvitationException(MessageResponse messageResponse)
    {
      this.messageResponse = messageResponse;
    }
    MessageResponse getMessageResponse()
    {
        return messageResponse;
    }
}
