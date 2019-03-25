import { AUTH_SUCCESS, AUTH_FAILURE, SET_AUTH_MESSAGE } from "../actionTypes";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoggedIn: true
      };
    case AUTH_FAILURE:
      return {
        ...state,
        ...payload,
        isLoggedIn: false
      };
    case SET_AUTH_MESSAGE:
      return {
        ...state,
        msg: payload
      }
    default:
      return state;
  }
};
