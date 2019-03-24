import { AUTH_SUCCESS, AUTH_FAILURE } from "../actionTypes";

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
    default:
      return state;
  }
};
