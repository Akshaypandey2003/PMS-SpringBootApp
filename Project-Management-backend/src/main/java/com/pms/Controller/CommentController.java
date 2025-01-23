package com.pms.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.Comment;
import com.pms.Entities.User;
import com.pms.Request.CreateCommentRequest;
import com.pms.Response.MessageResponse;
import com.pms.Services.CommentService;
import com.pms.Services.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController 
{
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    //---------- Create comment handler ------------------
    @PostMapping()
    public ResponseEntity<Comment> createComment(
        @RequestBody CreateCommentRequest createCommentRequest,
        @RequestHeader("Authorization")String jwtToken) throws Exception
    {

        User user = userService.findUserProfileByJwt(jwtToken);
        Comment comment = commentService.createComment(
                            createCommentRequest.getIssueId(),
                            user.getId(),
                            createCommentRequest.getContent());


         return new ResponseEntity<>(comment,HttpStatus.CREATED);
    }

   //---------- Delete comment handler ------------------
    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(
        @PathVariable Long commentId,
        @RequestHeader("Authorization")String jwtToken) throws Exception
    {

        User user = userService.findUserProfileByJwt(jwtToken);
        commentService.deleteComment(commentId, user.getId());
        
        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Comment deleted successfully...");

        return ResponseEntity.ok(messageResponse);

    }

    //---------- Create comment handler ------------------
    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentByIssueId(@PathVariable Long issueId ) throws Exception      
    {
        List<Comment> comments = commentService.findCommentByIssueId(issueId);
        
        return ResponseEntity.ok(comments);

    }

}
