package com.pms.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.pms.Entities.Chat;
import com.pms.Entities.Project;
import com.pms.Entities.User;

public interface  ProjectService {
    
    Project createProject(Project project , User user) throws Exception;

    List<Project>getProjectsByTeam(User user,String category,String tag)throws Exception;
    
    List<Project>getAllProjects()throws Exception;

    Project getProjectById(Long id) throws Exception;

    void deleteProject(Long projectId, Long userId)throws Exception;

    Project updateProject(Project project, Long id)throws Exception;

    List<Project> searchProjects(String keyword, User user)throws Exception;

    void addUserToProject(Long projectId, Long userId)throws Exception;
    void removeUserFromProject(Long projectId, Long userId)throws Exception;

    Chat getChatByProjectId(Long projectId)throws Exception;


}
