const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const signup = async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });
  
  let existUser;
  try {
    existUser = await User.findOne({email});
  } catch(err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Signing up failed, please try again.' }] });
  }

  if(existUser) {
    res.status(422).json({ errors: [{ msg: 'User already exist, try with new data' }] });
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch(err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Could not create a user, please try again.' }] });
  }

  const newUser = new User({
    name,
    email,
    avatar,
    password: hashPassword
  })

  try {
    await newUser.save();
  } catch(err) {
    console.err(err);
    res.status(500).json({ errors: [{ msg: 'Signing up failed, please try again.' }] });
  }

  let token;
  try {
    token = jwt.sign({ userId: newUser.id }, 'supersecret', { expiresIn: '1h' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Signing up failed, please try again.' }] });
  }

  res.status(201).json({userId: newUser.id, token});
}

const getUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.userId, '-password');
  } catch(err) {
    res.status(500).json({ msg: 'Fetching user failed, please try again.' });
  }

  res.status(200).json({ user });
}

module.exports = {
  signup,
  getUser
}