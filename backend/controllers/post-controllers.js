const { validationResult } = require('express-validator');

const User = require('../models/user');
const Post = require('../models/post');


const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  let user;
  try { 
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    next(new Error('Create post failed, please try again'));
  }

  if(!user) {
    res.status(404).json({ msg: 'Create post failed, user is not found.' });
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
    res.status(404).json({ msg: 'Do not have a posts found.' });
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
    res.status(404).json({ msg: 'Do not have a post found.' });
  }

  res.status(200).json({ post });
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
}