import axios from 'axios';

import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, GET_PROFILES, GET_GITHUBREPOS, CLEAR_PROFILE } from './types';
import { logout } from './auth';


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

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('http://localhost:5000/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles
    });
  } catch (err) {
    const { msg, status } = err.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    })
  }
}

export const getAllProfileById = (userId) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
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

export const getGithubRepos= (username) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
    dispatch({
      type: GET_GITHUBREPOS,
      payload: res.data.repos
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
    await axios.post('http://localhost:5000/api/profile', formData, config);
    
    dispatch(setAlert(`You ${!edit ? 'Create' : 'Edit'} profile success`, 'success'));
    
    if(!edit) {
      history.push('/dashboard');
    } else {
      dispatch(getCurrentProfile());
      window.scrollTo(0, 0);
    }

  } catch (err) {
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
    await axios.post(`http://localhost:5000/api/profile/${type}`, formData, config);
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

export const deleteExperienceOrEducation = (expId, educId) => async dispatch => {
  const url = `http://localhost:5000/api/profile/${expId ? `experience/${expId}` : `education/${educId}`}`

  try {
    await axios.delete(url);
    dispatch(getCurrentProfile());
    dispatch(setAlert(`You delete ${expId ? 'experience' : 'education'} field success`, 'success'));
  } catch (err) {
    window.scrollTo(0, 0);
    dispatch(setAlert(`Delete ${expId ? 'experience' : 'education'} failed.`, 'danger'));
    dispatch(setAlert(err.response.msg, 'danger'))
  }
}

export const deleteAccount = (history) => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone.')) {
    try {
      await axios.delete('http://localhost:5000/api/profile');

      dispatch(logout());
      dispatch(setAlert(`You delete your profile success`, 'success'));
      setTimeout(() => {
        history.push('/');
      }, 3000);
    } catch (err) {
      window.scrollTo(0, 0);
      dispatch(setAlert(`Delete your profile failed.`, 'danger'));
      dispatch(setAlert(err.response.msg, 'danger'))
    }
  }

}