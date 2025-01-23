package com.pms.Services;

import java.util.List;
import java.util.Optional;

import com.pms.Entities.Issue;
import com.pms.Entities.User;
import com.pms.Request.IssueRequest;

public interface IssueService {
 
    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getISsuesByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue,User user) throws Exception;

    Optional<Issue> updateIssue(Long issueId, IssueRequest updateIssue,Long userId)throws Exception;

    void deleteIssue(Long issueId, Long userId) throws Exception;

    Issue addUserToIssue(Long issueId, Long userId)throws Exception;

    Issue updateStatus(Long issueId, String status)throws Exception;
}
