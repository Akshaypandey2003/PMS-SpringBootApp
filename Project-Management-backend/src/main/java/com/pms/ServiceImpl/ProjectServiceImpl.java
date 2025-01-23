package com.pms.ServiceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.Entities.Chat;
import com.pms.Entities.Project;
import com.pms.Entities.User;
import com.pms.Repository.ProjectRepo;
import com.pms.Services.ChatService;
import com.pms.Services.ProjectService;
import com.pms.Services.UserService;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;


    //Creating Project 
     
    @Override
    public Project createProject(Project project, User user) throws Exception {
       Project newProject = new Project();
       newProject.setOwner(user);
       newProject.setTags(project.getTags());
       newProject.setCategory(project.getCategory());
       newProject.setName(project.getName());
       newProject.setDescription(project.getDescription());
       newProject.getTeam().add(user);
        
       Project savedProject = projectRepo.save(newProject);

       Chat chat = new Chat();
       chat.setProject(savedProject);
    
       Chat projectChat = chatService.createChat(chat);
        savedProject.setChat(projectChat);

      return savedProject;

    }
   
    //Fetch all the projects 
    @Override
   public List<Project> getAllProjects() throws Exception {
      
      List<Project>projects = projectRepo.findAll();
      System.out.println("All fetched projects are: "+projects);

      return projects;
   }

    //Get all Projects matching with category or tags
    @Override
    public List<Project> getProjectsByTeam(User user, String category, String tag) throws Exception {
       List<Project>projects = projectRepo.findByTeamContainingOrOwner(user, user);

       if(category!=null)
       {
        projects = projects.stream().filter(project -> project.getCategory().equalsIgnoreCase(category)).collect(Collectors.toList());
       }
       if(tag!=null)
       {
        projects = projects.stream().filter(project -> project.getTags().contains(tag)).collect(Collectors.toList());
       }
       return projects;
    }

    //Get project by id
    @Override
    public Project getProjectById(Long id) throws Exception {
        Optional<Project>project = projectRepo.findById(id);

        if(project.isEmpty())
        {
            throw new Exception("Project not found !!");
        }

        return project.get();
    }

    //Delete a project
    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {

       projectRepo.deleteById(projectId);
    }

    //Update any project
    @Override
    public Project updateProject(Project project, Long id) throws Exception {
       
        Project p = getProjectById(project.getId());

        p.setName(project.getName());
        p.setCategory(project.getCategory());
        p.setChat(project.getChat());
        p.setDescription(project.getDescription());
        p.setTags(project.getTags());
        p.setOwner(project.getOwner());
        p.setIssues(project.getIssues());

        
        return projectRepo.save(p);
    }

    //Add user or member to a project

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {

       Project project = getProjectById(projectId);
       
       User user = userService.findUserById(userId);

       if(!project.getTeam().contains(user))
       {
          project.getTeam().add(user);
          project.getChat().getUsers().add(user);
       }
       projectRepo.save(project);
    }

    //Remove a member from the project
    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {
       Project project = getProjectById(projectId);
       
       User user = userService.findUserById(userId);

       if(project.getTeam().contains(user))
       {
          project.getTeam().remove(user);
          project.getChat().getUsers().remove(user);
       }
       projectRepo.save(project);
    }

    //Get chats of any particular project
    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
       
        Project project = getProjectById(projectId);

        return project.getChat();
    }

    //Search projects by keyword
    @Override
    public List<Project> searchProjects(String keyword, User user) throws Exception 
    {
      List<Project> projects = projectRepo.findByNameContainingAndTeamContaining(keyword, user);
      return projects;
    }
}
