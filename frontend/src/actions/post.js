import axios from 'axios';

import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';


export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts
    })
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}