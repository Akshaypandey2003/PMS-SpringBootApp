package com.pms.Request;

import java.time.LocalDateTime;

import com.pms.Entities.Issue;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentRequest {
    
    private String content;

    private Long issueId;
}
