const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('post get route');
});

module.exports = router;
