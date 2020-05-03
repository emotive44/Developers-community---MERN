const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/check-auth');
const postControllers = require('../controllers/post-controllers');


router.post('/', 
  auth,
  [
    check('text', 'Text is required.').not().isEmpty()
  ], 
  postControllers.createPost
);

router.get('/', auth, postControllers.getPosts);

router.get('/:postId', auth, postControllers.getPostById);

router.delete('/:postId', auth, postControllers.deletePost);

module.exports = router;
