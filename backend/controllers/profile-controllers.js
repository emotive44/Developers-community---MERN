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

module.exports = {
  getProfile,
}