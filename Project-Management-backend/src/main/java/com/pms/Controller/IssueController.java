package com.pms.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pms.DTO.IssueDTO;
import com.pms.Entities.Issue;
import com.pms.Entities.User;
import com.pms.Request.IssueRequest;
import com.pms.Response.AuthResponse;
import com.pms.Services.IssueService;
import com.pms.Services.UserService;

@RestController
@RequestMapping("/api/tasks")
public class IssueController {
    
    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    Logger log = org.slf4j.LoggerFactory.getLogger(IssueController.class);

    //------------ Get issue / task by issue id -------------------------
    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws Exception
    {
      return new ResponseEntity<>(issueService.getIssueById(issueId),HttpStatus.OK);
    }
    
    //------------ Get issue / task by project id -------------------------
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId) throws Exception
    {
        return new ResponseEntity<>(issueService.getISsuesByProjectId(projectId),HttpStatus.OK);
    }

    //------------ Create Issue Handler ------------------------
    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(
        @RequestBody IssueRequest issueRequest,
        @RequestHeader("Authorization")String jwtToken) throws Exception
    {
       
      log.info("Issues data inside controller1:",issueRequest.getDueDate());
        User tokenUser = userService.findUserProfileByJwt(jwtToken);
        User user = userService.findUserById(tokenUser.getId());
       
        Issue issue = issueService.createIssue(issueRequest, user);
      
        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setTitle(issue.getTitle());
        issueDTO.setDescription(issue.getDescription());
        issueDTO.setPriority(issue.getPriority());
        issueDTO.setAssignee(issue.getAssignee());
        issueDTO.setDueDate(issue.getDueDate());
        issueDTO.setProject(issue.getProject());
        issueDTO.setId(issue.getId());
        issueDTO.setTags(issue.getTags());
        issueDTO.setStatus(issue.getStatus());
        issueDTO.setAssignee(issue.getAssignee());

      return new ResponseEntity<>(issueDTO,HttpStatus.CREATED);
    }
    
    //------------ Delete Issue handler -------------------------
    @DeleteMapping("/{issueId}")
    public ResponseEntity<AuthResponse> deleteIssue(
        @PathVariable Long issueId, @RequestHeader("Authorization")String jwtToken)throws Exception
    {
        User user = userService.findUserProfileByJwt(jwtToken);

        issueService.deleteIssue(issueId, user.getId());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwtToken);
        authResponse.setMsg("Issue Deleted successfully...");

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }

    //------------ Add user / member to an issue/task -------------------------
    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
     @PathVariable Long userId) throws Exception
    {

      Issue issue = issueService.addUserToIssue(issueId, userId);
      
      return ResponseEntity.ok(issue);
    }



    //------------ Update Issue Handler -------------------------
    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable Long issueId,
     @PathVariable String status) throws Exception
    {

      Issue issue = issueService.updateStatus(issueId, status);
      
      return ResponseEntity.ok(issue);
    }
}
