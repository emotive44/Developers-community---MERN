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
console.log(edit, '0')
  try {
    await axios.post('http://localhost:5000/api/profile', formData, config);
    
    dispatch(getCurrentProfile());
  
    dispatch(setAlert(`You ${!edit ? 'Create' : 'Edit'} profile success`, 'success'));

    if(!edit) {
      history.push('/dashboard');
    } else {
      window.scrollTo(0, 0);
    }

    console.log(edit, '1')

  } catch (err) {
    console.log(edit, '2');
    window.scrollTo(0, 0);
    dispatch(setAlert(`${!edit ? 'Create' : 'Edit'} profile FAILED.`, 'danger'));

    const errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const addExperienceOrEducation = (formData, history, type) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`http://localhost:5000/api/profile/${type}`, formData, config);
    console.log(1)
    dispatch(getCurrentProfile());
  
    dispatch(setAlert(`You add ${type} success`, 'success'));
    history.push('/dashboard');
  } catch (err) {
    window.scrollTo(0, 0);
    dispatch(setAlert(`Add ${type} failed.`, 'danger'));

    const errors = err.response.data.errors
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}