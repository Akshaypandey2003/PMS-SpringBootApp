/* eslint-disable no-unused-vars */
import { API_BASE_URL } from "@/Config/api"
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS,REGISTER_FAILURE, LOGIN_FAILURE } from "./ActionType"
import axios from 'axios';
import { persistor } from "../Store";
import { Navigate } from "react-router-dom";

export const register=(userData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
         const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
         console.log("DAta getting after sign up request is:",data);
         if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:REGISTER_SUCCESS,payload:data})
         }
         else
         {
          dispatch({type:REGISTER_FAILURE,payload:data})
         }
         console.log("Register success : ",data);
    } catch (error) {
         console.log("This is the error is signup:",error.message)
    }
}
export const login=(userData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
         const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
          
         console.log("Login success : ",data);
         if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:LOGIN_SUCCESS,payload:data})
         }
         return { success: true, data };
        
    } catch (error) {
     if(error.response && error.response.data)
     {
          
          dispatch({type:LOGIN_FAILURE,payload:error.response.data})
          return { success: false, error:error.response?.data?.message};
     }
    }
}
export const getUser=()=>async(dispatch,getState)=>{
     const { auth } = getState(); // Access Redux state

    dispatch({type:GET_USER_REQUEST})
    try {
         const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
             headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
             },
         })
         console.log("Fetching user success : ", data);
        
            dispatch({type:GET_USER_SUCCESS,payload:data})
            return { success: true, data };
        
    } catch (error) {
         console.log(error.response);
         return { success: false, error:error.response?.data?.message};
    }
}

export const logout = () => async (dispatch) => {
     console.log("Dispatching LOGOUT action...");
     dispatch({ type: LOGOUT }); // Reset Redux state
     localStorage.clear(); // Explicitly remove persisted root
     persistor.purge(); // Clear the Redux Persist cache
     console.log("Persist:root removed and cache purged.");
 };
 