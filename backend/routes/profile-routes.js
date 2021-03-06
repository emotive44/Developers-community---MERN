const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/check-auth');
const profileControllers = require('../controllers/profile-controllers');

router.get('/me', auth, profileControllers.getProfile);

router.get('/', profileControllers.getAllProfiles);

router.get('/user/:userId', profileControllers.getProfileByUserId);

router.get('/github/:username', profileControllers.getGithubRepos);

router.post('/',
  [
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills is required.').not().isEmpty(),
  ],
  auth, 
  profileControllers.createProfile
);

router.post('/experience',
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
  ],
  auth, 
  profileControllers.AddProfileExperience
);

router.post('/education',
  [
    check('school', 'School is required.').not().isEmpty(),
    check('degree', 'Degree is required.').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
  ],
  auth,
  profileControllers.AddProfileEducation
);

router.delete('/education/:educId', auth, profileControllers.deleteProfileEducation);

router.delete('/experience/:expId', auth, profileControllers.deleteProfileExperience);

router.delete('/', auth, profileControllers.deleteProfile);

module.exports = router;
