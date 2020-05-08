import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuth: false,
  userId: null
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        userId: payload._id
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        isAuth: false,
      }
    default:
      return state;
  }
}