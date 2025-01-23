package com.pms.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pms.Entities.Issue;

public interface IssueRepo extends JpaRepository<Issue,Long>{
    public List<Issue> findByProjectId(Long projectId);
}
