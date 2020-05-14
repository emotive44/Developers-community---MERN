import axios from 'axios';

import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types';


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

export const likeOrUnlike = (postId, type) => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/${postId}/${type}`);
    console.log(res.data)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId,
        likes: res.data
      }
    })
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}

export const deletePost = (postId) => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: {
        id: postId
      }
    })
    dispatch(setAlert('You delete your post successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}