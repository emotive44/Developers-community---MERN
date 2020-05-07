import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuth: false,
  userId: null
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}