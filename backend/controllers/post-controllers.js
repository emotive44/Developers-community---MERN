const { validationResult } = require('express-validator');

const User = require('../models/user');
const Post = require('../models/post');


const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;
  try { 
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    next(new Error('Create post failed, please try again'));
  }

  if(!user) {
    return res.status(404).json({ msg: 'Create post failed, user is not found.' });
  }

  const newPost = new Post({
    name: user.name,
    user: req.userId,
    avatar: user.avatar,
    text: req.body.text,
  })

  try {
    await newPost.save();
  } catch(err) {
    res.status(500).json({ msg: 'Create post failed, please try again.' });
  }

  res.status(201).json({ post: newPost });
}

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find().sort({ date: -1 });
  } catch (error) {
    next(new Error('Fetching posts failed, please try again.'));
  }

  if(!posts) {
    return res.status(404).json({ msg: 'Do not have a posts found.' });
  }

  res.status(200).json({ posts });
}

const getPostById = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch(err) {
    next(new Error('Fetching post failed, please try again.'));
  }
  
  if(!post) {
    return res.status(404).json({ msg: 'Do not have a post found.' });
  }

  res.status(200).json({ post });
}

const deletePost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch(err) {
    next(new Error('Delete a post failed, please try again.'));
  }

  if(!post) {
    return res.status(404).json({ msg: 'Could not found a post' });
  }

  if(post.user.toString() !== req.userId) {
    return res.status(401).json({ msg: 'User is not authorization to delete a post.' });
  }

  try {
    post.remove();
  } catch (error) {
    return res.status(500).json({ msg: 'Delete a post failed.' });
  }

  res.status(200).json({ msg: 'Deleted a post.' });
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
}