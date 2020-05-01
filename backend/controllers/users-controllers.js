const { validationResult } = require('express-validator');


const signup = (req, res, next) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  res.status(201).json({msg: 'Sign up'})
}

module.exports = {
  signup 
}