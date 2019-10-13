const express = require('express');
const router = express.Router();
const User = require('../../../models/User');  
const { registerValidation } = require('../../../validation');


router.post('/register', async (req, res) => {
  // data validation
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    const savedUser = await user.save();
    res.json({'savedUser': savedUser, 'message': `Added ${savedUser.username}`});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;