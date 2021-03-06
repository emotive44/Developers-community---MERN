import axios from 'axios';

import { setAlert } from './alert';
import { 
  GET_POST,
  GET_POSTS, 
  POST_ERROR, 
  UPDATE_LIKES, 
  REMOVE_COMMENT,
  ADD_COMMENT,
  DELETE_POST,
  CREATE_POST
} from './types';


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

export const createPost = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('http://localhost:5000/api/posts/', formData, config);
    dispatch({
      type: CREATE_POST,
      payload: {
        post: res.data.post
      }
    })
    dispatch(setAlert('You create your post successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}

export const getPost = (postId) => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts/' + postId);
    dispatch({
      type: GET_POST,
      payload: res.data.post
    })
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
    dispatch(setAlert('You add your comment successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: {
        id: commentId,
        comments: res.data
      }
    })
    dispatch(setAlert('You delete your comment successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText }
    })
  }
}