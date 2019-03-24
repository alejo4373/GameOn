import { SET_USER, REMOVE_USER} from '../actionTypes'
export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case REMOVE_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state;
  }
}
