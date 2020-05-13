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

const likePost = async (req, res, next) => {
  let existUser;
  try {
    existUser = await User.findById(req.userId);
  } catch (error) {
    next(new Error('Like post failed, please try again.'));
  }

  if(!existUser) {
    return res.status(404).json({ msg: 'Like post failed, user is not found' });
  }

  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch (error) {
    next(new Error('Like post failed, please try again.'));
  }

  if(!post) {
    return res.status(404).json({ msg: 'Like post failed, post is not found' });
  }

  try {
    const isLiked = post.likes.map(like => like.user).indexOf(existUser.id);
    if(isLiked !== -1) {
      return res.status(400).json({ msg: 'You alredy liked a post' });
    }

    post.likes.unshift({ user: existUser.id });
    await post.save();
  } catch (error) {
    next(new Error('Like post failed, please try again.'));
  }

  res.status(201).json(post.likes);
}

const unlikePost = async (req, res, next) => {
  let existUser;
  try {
    existUser = await User.findById(req.userId);
  } catch (error) {
    next(new Error('Unlike post failed, please try again.'));
  }

  if(!existUser) {
    return res.status(404).json({ msg: 'Unlike post failed, user is not found' });
  }

  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch (error) {
    next(new Error('Unlike post failed, please try again.'));
  }

  if(!post) {
    return res.status(404).json({ msg: 'Unlike post failed, post is not found' });
  }

  try {
    const isLiked = post.likes.map(like => like.user).indexOf(existUser.id);
    if(isLiked === -1) {
      return res.status(400).json({ msg: 'You alredy unliked a post' });
    }
    
    post.likes = post.likes.filter(like => like.user.toString() !== existUser.id);
    await post.save();
  } catch (error) {
    next(new Error('Unlike post failed, please try again.'));
  }

  res.status(201).json(post.likes);
}

const createComment = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;
  try { 
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    next(new Error('Create comment failed, please try again'));
  }

  if(!user) {
    return res.status(404).json({ msg: 'Create comment failed, user is not found.' });
  }

  let post;
  try { 
    post = await Post.findById(req.params.postId);
  } catch(err) {
    next(new Error('Create comment failed, please try again'));
  }

  if(!post) {
    return res.status(404).json({ msg: 'Create comment failed, post is not found.' });
  }

  const comment = {
    user: req.userId,
    text: req.body.text,
    name: req.body.name,
    date: req.body.date,
    avatar: req.body.avatar,
  }

  try {
    post.comments.unshift(comment);
    await post.save();
  } catch (error) {
    next(new Error('Create comment failed, please try again'));
  }

  res.status(201).json({ msg: 'You create a comment.'});
}

const deleteComment = async (req, res, next) => {
  let user;
  try { 
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    next(new Error('Delete comment failed, please try again'));
  }

  if(!user) {
    return res.status(404).json({ msg: 'Delete comment failed, user is not found.' });
  }

  let post;
  try { 
    post = await Post.findById(req.params.postId);
  } catch(err) {
    next(new Error('Detele comment failed, please try again'));
  }

  if(!post) {
    return res.status(404).json({ msg: 'Delete comment failed, post is not found.' });
  }

  try {
    const comment = post.comments.find(comment => comment.id.toString() === req.params.commentId);
    if(!comment) {
      return res.status(404).json({ msg: 'Comment does not exist.' });
    }

    if(comment.user.toString() !== req.userId) {
      return res.status(401).json({ msg: 'You are not authorize to delete this comment' });
    }
    
    post.comments = post.comments.filter(comment => comment.id.toString() !== req.params.commentId);
    await post.save();

  } catch (error) {
    next(new Error('Detele comment failed, please try again'));
  }

  res.status(200).json({ msg: 'You delete comment' });
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  deleteComment
}