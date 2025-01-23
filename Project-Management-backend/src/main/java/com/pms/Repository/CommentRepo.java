package com.pms.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Comment;

public interface CommentRepo extends JpaRepository<Comment,Long>{
    
    List<Comment> findByIssueId(Long issueId);
}
