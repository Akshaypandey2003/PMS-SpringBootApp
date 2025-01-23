/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { UPDATE_USER } from "../Auth/ActionType";
import { FETCH_PROJECTS_REQUEST,SEARCH_PROJECT_REQUEST, FETCH_PROJECTS_SUCCESS,SEARCH_PROJECT_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS,  FILTER_PROJECT_BY_CATEGORY_REQUEST,FILTER_PROJECT_BY_CATEGORY_SUCCESS,FILTER_PROJECT_BY_TAG_REQUEST,FILTER_PROJECT_BY_TAG_SUCCESS, CLEAR_CATEGORY_WISE_PROJECTS,CLEAR_TAG_WISE_PROJECTS, ACCEPT_INVITATION_FAILURE} from "./ActionType"
import api from "@/Config/api";

export const clearCategoryWiseProjects = ()=> (dispatch)=>{
     return new Promise((resolve, reject) => {
          try {
               dispatch({type:CLEAR_CATEGORY_WISE_PROJECTS})
               resolve(); // Resolve with the filtered data
          } catch (error) {
            console.error(error.message);
            reject(error); // Reject with the error
          }
        });
          
}
export const clearTagsWiseProjects = ()=> (dispatch)=>{
     return new Promise((resolve, reject) => {
          try {
            dispatch({type:CLEAR_TAG_WISE_PROJECTS})
            resolve(); // Resolve with the filtered data
          } catch (error) {
            console.error(error.message);
            reject(error); // Reject with the error
          }
        });
       
}
//Fetching projects before login
export const fetchAllProjects = ()=>async(dispatch)=>{
     dispatch({type:FETCH_PROJECTS_REQUEST})
     try {
           const {data} = await api.get("http://localhost:5454/api/projects/all")

           console.log("All projects before login: ",data)
           dispatch({type:FETCH_PROJECTS_SUCCESS,payload:data})
     } catch (error) {
          console.log(error)
     }
}
//Fetching projects after login
export const fetchProjects=(category,tag)=>async(dispatch,getState)=>{

     // const {project} = getState();
     // if (project.projects && project.projects.length > 0)
     // {
     //      return;
     // }
     dispatch({type:FETCH_PROJECTS_REQUEST})
    try {
         const {data} = await api.get("/api/projects",{
          headers: {
               "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
             },
          params:
          {category,tag}
         }      
     )
          console.log("All projects: ",data)
          dispatch({type:FETCH_PROJECTS_SUCCESS,payload:data})
    } catch (error) {
         console.log(error)
    }
}

export const searchProjects=(keyword)=>async(dispatch)=>{
     dispatch({type:SEARCH_PROJECT_REQUEST})
    try {
         const {data} = await api.get("/api/projects/search?keyword="+keyword,{
          headers: {
               "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
             },
          }
         )
          console.log("Searched projects: ",data)
          dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data})
    } catch (error) {
         console.log(error)
    }
}

export const createProjects=(projectData)=>async(dispatch,getState)=>{
     dispatch({type:CREATE_PROJECT_REQUEST})
    try {
     console.log("Payload which is being sent :", projectData);
         const {data} = await api.post("/api/projects",projectData,
          {headers:{
               "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            },
          }
         )
          console.log("Created projects: ",data)
          dispatch({type:CREATE_PROJECT_SUCCESS,project:data})


//           // Optimistically update the user in Redux
//     const { auth } = getState(); // Get the current user data from Redux
//     const updatedUser = {
//       ...auth.user,
//       projectCount: auth.user.projectCount + 1, // Increment project count
//     };

//     dispatch({ type: UPDATE_USER, payload: updatedUser });


    } catch (error) {
         console.log(error.message)
    }
}
export const filterProjectsByCategory=(category)=>(dispatch,getState)=>{
     const {project} = getState();
     console.log("CAtegory is: ",category);
     dispatch({type:FILTER_PROJECT_BY_CATEGORY_REQUEST})
     return new Promise((resolve, reject) => {
          try {
            const filter = project?.projects.filter((item) => item.category==category);
            dispatch({ type: FILTER_PROJECT_BY_CATEGORY_SUCCESS, projects: filter });
            console.log("Category-wise filtered data: ", filter);
            resolve(filter); // Resolve with the filtered data
          } catch (error) {
            console.error(error.message);
            reject(error); // Reject with the error
          }
        });

}
export const filterProjectsByTag = (tag) => (dispatch, getState) => {
     console.log("Tag is: ", tag);
     const { project } = getState();
     dispatch({ type: FILTER_PROJECT_BY_TAG_REQUEST });
   
     return new Promise((resolve, reject) => {
       try {
         const filter = project?.projects.filter((item) => item.tags.includes(tag));
         dispatch({ type: FILTER_PROJECT_BY_TAG_SUCCESS, projects: filter });
         console.log("Tag-wise filtered data: ", filter);
         resolve(filter); // Resolve with the filtered data
       } catch (error) {
         console.error(error.message);
         reject(error); // Reject with the error
       }
     });
   };
   

export const fetchProjectById=(id)=>async(dispatch)=>{
     dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try {
         const {data} = await api.get("/api/projects/"+id)
          console.log("project: ",data)
          dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,project:data})
    } catch (error) {
         console.log(error.message)
    }
}

export const deleteProject=({projectId})=>async(dispatch)=>{
     dispatch({type:DELETE_PROJECT_REQUEST})
    try {
          const {data} = await api.delete("/api/projects/"+projectId)
          console.log("Deleted Project: ",data)
          dispatch({type:DELETE_PROJECT_SUCCESS,projectId})
    } 
    catch (error) {
         console.log(error)
    }
}

export const inviteToProject=({email,projectId})=>async(dispatch)=>{
     console.log("inside reducer data: ",email,projectId);
     dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try {
         const {data} = await api.post("/api/projects/invite",{email,projectId},{
          headers: {
               Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ensure this matches what the backend expects
           },
         })
          console.log("Invite Project: ",data)
          dispatch({type:INVITE_TO_PROJECT_SUCCESS,payload:data})
    } catch (error) {
         console.log(error)
    }
}

export const acceptInvitation=({token,navigate})=>async(dispatch)=>
{
     dispatch({type:ACCEPT_INVITATION_REQUEST})
    try {
         const {data} = await api.get("/api/projects/accept_invite",{
          headers: {
               Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ensure this matches what the backend expects
           },
          params:{
              token
          }
         })
          console.log("Accept invite: ",data)
          dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data})
          await dispatch(fetchProjectById(data.projectId));
          navigate("/project/"+data.projectId)
    }
    catch (error) {
          if(error.response && error.response)
          {
               dispatch({type:ACCEPT_INVITATION_FAILURE,payload:{data:error?.response?.data,status:error?.response?.status}})

               navigate("/invitation_error");
               console.log("Invite accept issue response: ",error.response);
               console.log("Invite accept issue message: ",error.response.data);
          }
         console.log(error)
    }
}

