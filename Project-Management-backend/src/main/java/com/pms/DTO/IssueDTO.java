package com.pms.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.pms.Entities.Project;
import com.pms.Entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IssueDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String projectId;
    private String priority;
    private LocalDate dueDate;
    private List<String>tags = new ArrayList<>();
    private Project project;

    //Exclude this assignee during serialization
    private User assignee;

}
