import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR 
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
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}