package com.pms.Controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pms.Entities.Chat;
import com.pms.Entities.Invitation;
import com.pms.Entities.Project;
import com.pms.Entities.User;
import com.pms.Request.InviteRequest;
import com.pms.Response.MessageResponse;
import com.pms.Services.InvitationService;
import com.pms.Services.ProjectService;
import com.pms.Services.UserService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;
    
    Logger log = LoggerFactory.getLogger(ProjectController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() throws Exception
    {
        log.info("Inside api/project/all");
        List<Project>projects = projectService.getAllProjects();
        System.out.println("All the projects in project controller:"+projects);

        return new ResponseEntity<>(projects,HttpStatus.OK);
    }

    // ------------- Get all the projects controller ----------------------
    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
        @RequestParam(required = false)String category,
        @RequestParam(required = false)String tag,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
        Thread.sleep(2000);
        User user = userService.findUserProfileByJwt(jwt);
         
        List<Project>projects = projectService.getProjectsByTeam(user, category, tag);

        return new ResponseEntity<>(projects,HttpStatus.OK);
    }

    // ------------- Get  project by project id controller ----------------------
    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(
        @PathVariable Long projectId,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
        Project project = projectService.getProjectById(projectId);

        return new ResponseEntity<>(project,HttpStatus.OK);
    }
    
     // ------------- Create project controller ----------------------
    @PostMapping
    public ResponseEntity<Project> createProject(
        @RequestBody Project project,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
        log.info("Received project: {}", project); // Log received payload
        log.info("JWT: {}", jwt); // Log JWT for debugging
        User user = userService.findUserProfileByJwt(jwt);
        Project savedProject = projectService.createProject(project,user);

        User updatedUser = userService.findUserById(user.getId()); 
    
        // Update the project size using the refreshed user object
        
        userService.updateUserProjectSize(updatedUser, 1);

        return new ResponseEntity<>(savedProject,HttpStatus.OK);
    }

     // ------------- Update project controller ----------------------
    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
        @PathVariable Long projectId,
        @RequestBody Project project,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
        Project savedProject = projectService.updateProject(project, projectId);

        return new ResponseEntity<>(savedProject,HttpStatus.OK);
    }

    // ------------- Delete project controller ----------------------
    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(
        @PathVariable Long projectId,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
       User user = userService.findUserProfileByJwt(jwt);
       projectService.deleteProject(projectId, user.getId());
       MessageResponse msgResponse = new MessageResponse("Project Deleted Successfully..");
        return new ResponseEntity<>(msgResponse,HttpStatus.OK);
    }

     // ------------- Search projects by keyword controller ----------------------
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(
        @RequestParam(required = false)String keyword,
        @RequestHeader("Authorization")String jwt
    ) throws Exception
    {
        User user = userService.findUserProfileByJwt(jwt);
         
        List<Project>projects = projectService.searchProjects(keyword, user);

        return new ResponseEntity<>(projects,HttpStatus.OK);
    }


     // ------------- Get all the chat by project id ----------------------
    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(
        @PathVariable Long projectId,
        @RequestHeader("Authorization")String jwt

    ) throws Exception
    {
        Chat chat = projectService.getChatByProjectId(projectId);

        return new ResponseEntity<>(chat,HttpStatus.OK);
    }
    

    //---------- Project Invite Controller -----------------
    @PostMapping("/invite")
    public ResponseEntity<MessageResponse>inviteProject(
        @RequestHeader("Authorization")String jwt,
        @RequestBody InviteRequest inviteRequest
    ) throws Exception
    {

        invitationService.sendInvitation(inviteRequest.getEmail(), inviteRequest.getProjectId());

        MessageResponse response = new MessageResponse("Project invitation sent successfully..");

      return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //------------ Accept Invite Controller -------------------
      @GetMapping("/accept_invite")
    public ResponseEntity<Invitation>acceptInviteProject(
        @RequestParam String token,
        @RequestHeader("Authorization")String jwt
    ) throws Exception
    {
        User user = userService.findUserProfileByJwt(jwt);
        Invitation invitation =  invitationService.acceptInvitation(token,user.getId());

        projectService.addUserToProject(invitation.getProjectId(),user.getId());

      return new ResponseEntity<>(invitation,HttpStatus.ACCEPTED);
    }


}
