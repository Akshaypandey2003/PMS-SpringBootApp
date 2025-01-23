package com.pms.Request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class IssueRequest {
    
     private String title;
     private String description;
     private String status;
     private Long projectId;
     private String priority;
     private LocalDate dueDate;
}
