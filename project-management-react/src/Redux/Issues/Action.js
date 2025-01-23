/* eslint-disable no-unused-vars */

import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE, FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS } from "./ActionType"
import api from "@/Config/api";

export const createIssue=(data)=>{
  
    return async(dispatch)=>{
        dispatch({type:CREATE_ISSUE_REQUEST});
        try{

            const response = await api.post(`/api/tasks`,data);
           
            dispatch({
                type:CREATE_ISSUE_SUCCESS,
                issues:response.data
            });
            console.log(" issue Creted successfully: ",response.data);
            
        }
        catch(error)
        {
          dispatch({
            type:CREATE_ISSUE_FAILURE,
            error:error.message,
          });
        }
    };
};
export const deleteIssue=(id)=>{
  
    return async(dispatch)=>{
        dispatch({type:DELETE_ISSUE_REQUEST});
        try{

            const response = await api.delete(`/api/tasks/${id}`);
           
            dispatch({
                type:DELETE_ISSUE_SUCCESS,
                issueId:id
            });
            console.log(" issue Deleted successfully: ",response.data);
        }
        catch(error)
        {
          dispatch({
            type:CREATE_ISSUE_FAILURE,
            error:error.message,
          });
        }
    };
};

export const fetchTasks=(id)=>{
  
    return async(dispatch)=>{
        dispatch({type:FETCH_ISSUES_REQUEST});
        try{
            const response = await api.get(`/api/tasks/project/${id}`);
            console.log("Fetched issue: ",response.data);
            dispatch({
                type:FETCH_ISSUES_SUCCESS,
                issues:response.data
            });
        }
        catch(error)
        {
          dispatch({
            type:FETCH_ISSUES_FAILURE,
            error:error.message,
          });
        }
    };
};


export const fetchIssueById=(id)=>{

    return async (dispatch)=>{
        dispatch({
            type:FETCH_ISSUES_BY_ID_REQUEST
        });
        try {
             const response = await api.get(`/api/tasks/${id}`);
             console.log("Fetch issue by id: ",response.data);
             dispatch({
                type:FETCH_ISSUES_BY_ID_SUCCESS,
                issues:response.data
             });
        } catch (error) {
            dispatch({
                type:FETCH_ISSUES_BY_ID_FAILURE,
                error:error.message
            });
        }
    };
};
export const updateIssueStatus=(id,status)=>{
    return async (dispatch)=>{
        dispatch({
            type:UPDATE_ISSUE_STATUS_REQUEST
        });
        try {
             const response = await api.put(`/api/tasks/${id}/status/${status}`);
             console.log("Update issue status: ",response.data);
             dispatch({
                type:UPDATE_ISSUE_STATUS_SUCCESS,
                issues:response.data
             });
        } catch (error) {
            dispatch({
                type:UPDATE_ISSUE_STATUS_FAILURE,
                error:error.message
            });
        }
    };
};

export const assigneUserToIssue=({issueId,userId})=>{
    return async (dispatch)=>{
        dispatch({
            type:ASSIGNED_ISSUE_TO_USER_REQUEST
        }); 
        try {
             const response = await api.put(`/api/tasks/${issueId}/assignee/${userId}`);
             console.log("Assigned issue: ",response.data);
             dispatch({
                type:ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issue:response.data
             });
        } catch (error) {
            dispatch({
                type:ASSIGNED_ISSUE_TO_USER_FAILURE,
                error:error.message
            });
        }
    };
};


