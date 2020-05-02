const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/check-auth');
const profileControllers = require('../controllers/profile-controllers');

router.get('/me', auth, profileControllers.getProfile);

router.get('/', profileControllers.getAllProfiles);

router.post('/',
  [
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills is required.').not().isEmpty(),
  ],
  auth, 
  profileControllers.createProfile
);

module.exports = router;
