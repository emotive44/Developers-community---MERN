import axios from 'axios';

import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';


export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });
  } catch (err) {
    const { msg, status } = err.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    })
  }
}

export const createAndUpdateProfile = (formData, history, edit = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('http://localhost:5000/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });
  
    dispatch(setAlert(`You ${!edit ? 'Create' : 'Edit'} profile success`, 'success'));

    if(!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch(setAlert(`${!edit ? 'Create' : 'Edit'} profile FAILED.`, 'danger'));

    const errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}