const { validationResult } = require('express-validator');

const User = require('../models/user');
const Post = require('../models/post');


const createPost = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  let user;
  try { 
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    res.status(500).json({ msg: 'Create post failed, please try again.' });
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

module.exports = {
  createPost,

}