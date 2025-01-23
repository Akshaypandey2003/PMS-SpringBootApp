package com.pms.Services;

import java.util.List;

import com.pms.Entities.Comment;

public interface CommentService {
    
    Comment createComment(Long issueId,Long userId,String comment)throws Exception;

    void deleteComment(Long commentId,Long userId)throws Exception;

    List<Comment>findCommentByIssueId(Long issueId)throws Exception;
}
