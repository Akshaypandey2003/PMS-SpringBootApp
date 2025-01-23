package com.pms.ServiceImpl;

import java.lang.StackWalker.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Comment;
import com.pms.Entities.Issue;
import com.pms.Entities.User;
import com.pms.Repository.CommentRepo;
import com.pms.Repository.IssueRepo;
import com.pms.Repository.UserRepo;
import com.pms.Services.CommentService;


@Service
public class CommentServiceImpl implements CommentService{
    
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private UserRepo userRepo;

    //creating comment----->
    @Override
    public Comment createComment(Long issueId, Long userId, String comment) throws Exception {
        
        Optional<Issue> issueOptional = issueRepo.findById(issueId);
        Optional<User> userOptional = userRepo.findById(userId);
       
        if(issueOptional.isEmpty())
        throw new Exception("Issue not found with id: "+issueId);
        if(userOptional.isEmpty())
        throw new Exception("User not found with id: "+userId);
       

        Issue issue = issueOptional.get();
        User user = userOptional.get();

        Comment comm = new Comment();
        comm.setIssue(issue);
        comm.setUser(user);
        comm.setContent(comment);
        comm.setCreatedDateTime(LocalDateTime.now());

        Comment savedComment = commentRepo.save(comm);

        issue.getComments().add(savedComment);

        return savedComment;
    }

    //Deleting comment

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {

        Optional<Comment> commentOptional = commentRepo.findById(commentId);
        Optional<User>userOptional = userRepo.findById(userId);

        if(commentOptional.isEmpty())
        throw new Exception("No comments found with id: "+commentId);

        if(userOptional.isEmpty())
        throw new Exception("No user found with id: "+userId);

        Comment comment = commentOptional.get();
        User user = userOptional.get();

        if(comment.getUser().equals(user)){
            commentRepo.delete(comment);
        }
        else
        {
            throw new Exception("Not allowed!!");
        }
    }
 
    //Find comment associated with any issue/task id
    @Override
    public List<Comment> findCommentByIssueId(Long issueId) throws Exception {

        return commentRepo.findByIssueId(issueId);
    }
    
}
