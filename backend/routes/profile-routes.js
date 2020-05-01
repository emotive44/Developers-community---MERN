const express = require('express');
const router = express.Router();

const auth = require('../middleware/check-auth');
const profileControllers = require('../controllers/profile-controllers');

router.get('/me', auth, profileControllers.getProfile);

module.exports = router;
