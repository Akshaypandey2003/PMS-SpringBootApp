package com.pms.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pms.Entities.Project;
import com.pms.Entities.User;

public interface ProjectRepo extends JpaRepository<Project,Long>
{
//    List<Project> findByOwner(User user);
   
   List<Project> findByNameContainingAndTeamContaining(String name,User user);

//    @Query("SELECT p From Project p join p.team t where t=:user")
//    List<Project> findProjectByTeam(@Param("user")User user);


   List<Project> findByTeamContainingOrOwner(User user, User owner);
} 
