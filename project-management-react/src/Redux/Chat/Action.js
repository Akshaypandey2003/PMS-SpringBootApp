/* eslint-disable no-unused-vars */

import { SEND_MESSAGE_REQUEST,SEND_MESSAGE_SUCCESS,SEND_MESSAGE_FAILURE,FETCH_CHAT_BY_PROJECT_REQUEST,FETCH_CHAT_BY_PROJECT_SUCCESS,FETCH_CHAT_BY_PROJECT_FAILURE,FETCH_CHAT_MESSAGES_REQUEST,FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE } from "./ActionType";

import api from "@/Config/api"; // Adjust the import path as necessary

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type:SEND_MESSAGE_REQUEST });
    try {
      console.log("Sender id:",messageData.senderId, "project Id: ",messageData.projectId)
      const response = await api.post(
        "/api/messages/send",
        messageData
      );
      dispatch({
        type:SEND_MESSAGE_SUCCESS,
        message: response.data,
      });
      console.log("Message send successfully:",response.data);
    } catch (error) {
        console.log(error);
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
      dispatch({ type:FETCH_CHAT_BY_PROJECT_REQUEST });
      try {
        const response = await api.get(
          `/api/projects/${projectId}/chat`
        );
        console.log("fetch chat ", response.data);
        dispatch({
          type: FETCH_CHAT_BY_PROJECT_SUCCESS,
          chat: response.data,
        });
      } catch (error) {
        console.log("error --", error);
        dispatch({
            type: FETCH_CHAT_BY_PROJECT_FAILURE,
            error: error.data,
        })
      }
    };
  };
export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
      try {
        const response = await api.get(
          `/api/messages/chat/${chatId}`
        );
        console.log("fetch messages ", response.data);
        dispatch({
          type: FETCH_CHAT_MESSAGES_SUCCESS,chatId,
          messages: response.data,
        });
      } catch (error) {
        console.log("error --", error);
        dispatch({
            type: FETCH_CHAT_MESSAGES_FAILURE,
            error: error.data,
        })
      }
    };
  };


  
