import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import { setAlert } from './alert';
import { 
  REGISTER_SUCCESS, 
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  CLEAR_PROFILE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT
} from './types';


export const register = (name, email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password });
  
  try {
    const res = await axios.post('http://localhost:5000/api/users/signup', body, config);
    
    dispatch({ 
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('You are register success', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REGISTER_FAIL });
  }
}

export const getUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users');
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
}

export const login = (email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({email, password });
  
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', body, config);
    
    dispatch({ 
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(getUser());

    dispatch(setAlert('You are login success', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: LOGIN_FAIL });
  }
}

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
}