package com.pms.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Issue;
import com.pms.Entities.Project;
import com.pms.Entities.User;
import com.pms.Repository.IssueRepo;
import com.pms.Request.IssueRequest;
import com.pms.Services.IssueService;
import com.pms.Services.ProjectService;
import com.pms.Services.UserService;


@Service
public class IssueServiceImpl implements IssueService{


    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;



    //Get Issue/task by Id

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepo.findById(issueId);

        if(issue.isPresent())
        return issue.get();

        throw new Exception("No Issue/Task found with the associted id: "+issueId);
    }

    //Get Issue/task by project Id
    @Override
    public List<Issue> getISsuesByProjectId(Long projectId) throws Exception {
        List<Issue>issues = issueRepo.findByProjectId(projectId);

        return issues;
    }

    //Creating issues/tasks for a project
    @Override
    public Issue createIssue(IssueRequest issueReq, User user) throws Exception {
      
        Project project = projectService.getProjectById(issueReq.getProjectId());
        Issue issue = new Issue();

        issue.setTitle(issueReq.getTitle());
        issue.setDescription(issueReq.getDescription());
        issue.setStatus(issueReq.getStatus());
        issue.setPriority(issueReq.getPriority());
        issue.setDueDate(issueReq.getDueDate());

        issue.setProject(project);
        return issueRepo.save(issue);
        
    }

    @Override
    public Optional<Issue> updateIssue(Long issueId, IssueRequest updateIssue, Long userId) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateIssue'");
    }

    //Deleting a issue or task from a project
    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {

        Issue issue = getIssueById(issueId);
        if(issue==null)
        throw new Exception("Issue not found with id: "+issueId);
        issueRepo.deleteById(issueId);
    }

    //Add user or  member to any task / issue
    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {

       User user = userService.findUserById(userId);
       Issue issue = getIssueById(issueId);

       issue.setAssignee(user);
       return issueRepo.save(issue);
    }
    //Updating the status of any issue

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);

        issue.setStatus(status);
       return issueRepo.save(issue);
    }
    
}
