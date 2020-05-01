const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const auth = require('../middleware/check-auth');


router.get('/', auth, usersControllers.getUser);

router.post('/signup',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter password with least 6 symbols').isLength({min: 6})
  ],
  usersControllers.signup
);

router.post('/login',
  [
    check('email', 'Please include a valid email.').normalizeEmail().isEmail(),
    check('password', 'Please enter password.')
  ],
  usersControllers.login
)

module.exports = router;
