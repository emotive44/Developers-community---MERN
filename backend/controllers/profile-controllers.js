const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const User = require('../models/user');

const getProfile = async (req, res) => {
  let profile;
  try { 
    profile = await Profile
      .findOne({ user: req.userId })
      .populate('user', ['name', 'avatar']);
    
  } catch(err) {
    res.status(500).json({ msg: 'Fetching profile failed, please try again.' });
  }

  if(!profile) {
    res.status(404).json({ msg: 'Profile not found.' });
  }

  res.status(200).json({ profile });
}

const createProfile = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
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

const getAllProfiles = async (req, res) => {
  let profiles;
  try {
    profiles = await Profile.find().populate('user', ['name', 'avatar']);
  } catch(err) {
    res.status(500).json({msg: 'Fetching profiles, failed, please try again.'});
  }

  if(!profiles) {
    res.status(404).json({msg: 'Could not found profiles'});
  }

  res.status(200).json({ profiles });
}

module.exports = {
  getProfile,
  createProfile,
  getAllProfiles,
}