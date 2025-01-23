/* eslint-disable no-unused-vars */
import {
  GET_USER_SUBSCRIPTION_FAILURE,
  GET_USER_SUBSCRIPTION_REQUEST,
  GET_USER_SUBSCRIPTION_SUCCESS,
  UPGRADE_SUBSCRIPTION_FAILURE,
  UPGRADE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_SUCCESS,
} from "./ActionType";
import api from "@/Config/api";

export const getUserSubscription = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.get(`/api/subscription/user`, {
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: GET_USER_SUBSCRIPTION_SUCCESS,
        payload: response.data,
      });
      console.log("USER Subscription: ", response.data);
    } catch (error) {
      dispatch({
        type: GET_USER_SUBSCRIPTION_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const upgradeSubscription = (planType) => {
    return async (dispatch) => {
      dispatch({ type: UPGRADE_SUBSCRIPTION_REQUEST});
      try {
        const response = await api.patch(`/api/subscription/upgrade`,null, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            planType:planType,
          },
        });
        dispatch({
          type: UPGRADE_SUBSCRIPTION_SUCCESS,
          payload: response.data,
        });
        console.log("Upgraded subscription: ", response.data);
      } catch (error) {
        dispatch({
          type: UPGRADE_SUBSCRIPTION_FAILURE,
          payload: error.message,
        });
      }
    };
  };
