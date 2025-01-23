/* eslint-disable no-unused-vars */

import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER } from "./ActionType";

const initialState = {
    user:null,
    loading:false,
    error:null,
    jwt:null,
    projectSize:0,
}
export const authReducer = (state=initialState,action)=>{

    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
               return {
                ...state,
                loading:true,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                jwt:action.payload.jwt
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                user:action.payload
            }
       case UPDATE_USER:
       return {
        ...state,
        error:null,
        user: action.payload, // Update user data optimistically
        projectSize: action.payload.projectCount || state.projectSize, // Update project count
      };
      case REGISTER_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.payload
        }
      case LOGIN_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.payload
        }
        case LOGOUT:
            return initialState; // Reset to initial state on logout
        default:
            return state; 
    }
}
export default authReducer;