/* eslint-disable no-unused-vars */
import {
  CREATE_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  ACCEPT_INVITATION_REQUEST,
  INVITE_TO_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FILTER_PROJECT_BY_CATEGORY_REQUEST,
  FILTER_PROJECT_BY_TAG_REQUEST,
  FILTER_PROJECT_BY_CATEGORY_SUCCESS,
  FILTER_PROJECT_BY_TAG_SUCCESS,
  CLEAR_TAG_WISE_PROJECTS,
  CLEAR_CATEGORY_WISE_PROJECTS,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAILURE
} from "./ActionType";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
  categoryWiseProjects:[],
  tagsWiseProjects:[],
};
export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
    case FILTER_PROJECT_BY_CATEGORY_REQUEST:
    case FILTER_PROJECT_BY_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case FILTER_PROJECT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryWiseProjects: action.projects,
      };
    case FILTER_PROJECT_BY_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tagsWiseProjects: action.projects,
      };
    case SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProjects: action.projects,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects,action.project],
      };
    case FETCH_PROJECT_BY_ID_SUCCESS:
        return{
            ...state,
            loading:false,
            projectDetails: action.project,
        }
    case CLEAR_CATEGORY_WISE_PROJECTS:
     return {
      ...state,
      loading:false,
      categoryWiseProjects: [],
     }
    case CLEAR_TAG_WISE_PROJECTS:
      return{
       ...state,
       loading:false,
       tagsWiseProjects: [],
      }
    case ACCEPT_INVITATION_FAILURE:
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    case DELETE_PROJECT_SUCCESS:
        return{
            ...state,
            loading:false,
            projects: state.projects.filter(project=>project.id != action.projectId),
        }
    default:
      return state;
  }
};
export default projectReducer;
