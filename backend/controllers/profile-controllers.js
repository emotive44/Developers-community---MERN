const mongoose = require('mongoose');
const axios = require('axios');
const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const User = require('../models/user');
const Post = require('../models/post');

const getProfile = async (req, res, next) => {
  let profile;
  try { 
    profile = await Profile
      .findOne({ user: req.userId })
      .populate('user', ['name', 'avatar']);
    
  } catch(err) {
    next(new Error('Fetching profile failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({ msg: 'Profile not found.' });
  }

  res.status(200).json({ profile });
}

const createProfile = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    bio,
    status,
    skills,
    company,
    website,
    twitter,
    youtube,
    location,
    linkedIn,
    facebook,
    instagram,
    githubUsername
  } = req.body;

  const profileFields = {};
  profileFields.user = req.userId;
  
  if(bio) { profileFields.bio = bio; } //// they are not required!
  if(status) { profileFields.status = status; }
  if(company) { profileFields.company = company; }
  if(website) { profileFields.website = website; }
  if(location) { profileFields.location = location; }
  if(githubUsername) { profileFields.githubUsername = githubUsername; } ////
  
  profileFields.social = {};  //// create social object!
  if(youtube) { profileFields.social.youtube = youtube; } 
  if(facebook) { profileFields.social.facebook = facebook; }
  if(linkedIn) { profileFields.social.linkedIn = linkedIn; }
  if(instagram) { profileFields.social.instagram = instagram; }
  if(twitter) { profileFields.social.twitter = twitter; } ////
  
  if(skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
 
  try {
    let profile = await Profile.findOne({ user: req.userId });

    if(profile &&
      profile.bio === bio && profile.status === status &&
      profile.company === company && profile.website === website &&
      profile.location === location && profile.githubUsername === githubUsername &&
      JSON.stringify(profile.social) === JSON.stringify(profileFields.social)
    ) {
      return res.status(400).json({ errors: [ { msg: 'You should make a changes first.'}]})
    }

    if(profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.userId },
        { $set: profileFields },
        { new: true }
      );
        
      return res.status(200).json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();

    res.status(201).json(profile);
  } catch(err) {
    res.status(500).json(({ errors: [{ msg: 'Creating profile failed, please try again.' }] }));
  }
}

const getAllProfiles = async (req, res, next) => {
  let profiles;
  try {
    profiles = await Profile.find().populate('user', ['name', 'avatar']);
  } catch(err) {
    next(new Error('Fetching profiles, failed, please try again.'));
  }

  if(!profiles) {
    return res.status(404).json({msg: 'Could not found profiles'});
  }

  res.status(200).json({ profiles });
}

const getProfileByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let profile;
  try {
    profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
  } catch(err) {
    next(new Error('Fetching profile, failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({ msg: 'Could not found profile.' });
  }

  res.status(200).json({ profile });
}

const deleteProfile = async (req, res, next) => {
  const userId = req.userId;
  
  let profile;
  try {
    profile = await Profile.findOne({ user: userId });
  } catch(err) {
    next(new Error('Deleting failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({msg: 'Could not find profile for this userId'});
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await profile.remove({ session: sess });
    await User.findByIdAndRemove(userId);
    await Post.deleteMany({ user: userId });
    sess.commitTransaction();
  } catch(err) {
    res.status(500).json({msg: 'Deleting failed, please try again.'});
  }

  res.status(200).json({msg: 'Deleted profile.'});
}

const AddProfileExperience = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    to,
    from,
    title,
    company,
    current,
    location,
    description
  } = req.body;

  const newExp = {
    to,
    from,
    title,
    company,
    current,
    location,
    description
  }

  let profile;
  try {
    profile = await Profile.findOne({ user: req.userId});
  } catch(err) {
    next(new Error('Add experience failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({ errors: [ { msg: 'Profile not found.'}]});
  }

  try {
    profile.experience.unshift(newExp);
    await profile.save();
  } catch(err) {
    res.status(500).json({ errors: [ { msg: 'Add experience failed, please try again.'}]});
  }

  res.status(201).json({ profile });
}

const deleteProfileExperience = async (req, res, next) => {
  const expId = req.params.expId;

  let profile;
  try {
    profile = await Profile.findOne({ user: req.userId });
  } catch(err) {
    next(new Error('Delete experience failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({ msg: 'Could not found profile' });
  }

  try {
    const index = profile.experience.map(x => x.id).indexOf(expId);
    profile.experience.splice(index, 1);
    
    await profile.save();
  } catch (err) {
    res.status(500).json({ msg: 'Delete experience failed, please try again.' });
  }

  res.status(200).json({ msg: 'Deleted experience.' });
}

const AddProfileEducation = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    to,
    from,
    school,
    degree,
    current,
    description,
    fieldOfStudy
  } = req.body;

  const newEduc = {
    to,
    from,
    school,
    degree,
    current,
    description,
    fieldOfStudy
  }

  let profile;
  try {
    profile = await Profile.findOne({ user: req.userId});
  } catch(err) {
    next(new Error('Add education failed, please try again.'));
  }

  if(!profile) {
    return res.status(404).json({ msg: 'Profile not found.'});
  }

  try {
    profile.education.unshift(newEduc);
    await profile.save();
  } catch(err) {
    res.status(500).json({ msg: 'Add education failed, please try again.'});
  }

  res.status(201).json({ profile });
}

const deleteProfileEducation = async (req, res, next) => {
  const educId = req.params.educId;

  let profile;
  try {
    profile = await Profile.findOne({ user: req.userId });
  } catch(err) {
    next(new Error('Delete education failed, please try again'));
  }

  if(!profile) {
    return res.status(404).json({ msg: 'Could not found profile' });
  }

  try {
    const index = profile.education.map(x => x.id).indexOf(educId);
    profile.education.splice(index, 1);
    
    await profile.save();
  } catch (err) {
    res.status(500).json({ msg: 'Delete education failed, please try again.' });
  }
  res.status(200).json({ msg: 'Deleted education.' });
}

const getGithubRepos = async (req, res) => {
  const clientId = 'ea7f618bbcf6c3678417';   //// this should be in config file
  const clientSecret = '095eb7260af90a5c43ef56a9b74d269f3658e4df'; ////
  
  try {
    const url = `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${
      clientId
    }&client_secret=${clientSecret}`;
      
    const respone = await axios.get(url, { headers: {'user-agent': 'node.js' }})
    const { data } = await respone;
    
    res.json({ repos: data })
  } catch (error) {
    res.status(500).json({ msg: 'Fetching github repos failed, please try again.' });
  }
}

module.exports = {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  AddProfileExperience,
  deleteProfileExperience,
  AddProfileEducation,
  deleteProfileEducation,
  getGithubRepos
}