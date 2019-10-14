const express = require('express');
const router = express.Router();
const User = require('../../../models/User');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../../../validation');


router.post('/register', async (req, res) => {
  // data validation
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if username exists
  const usernameExists = await User.findOne({username: req.body.username});
  if (usernameExists) return res.status(409).send('Username already exists');

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    const savedUser = await user.save();
    res.json({'savedUser': savedUser, 'message': `Added ${savedUser.username}`});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async(req, res) => {
  // data validation
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // check if username exists
  const user = await User.findOne({username: req.body.username});
  if(!user) return res.status(422).send('User doesn\'t exist');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(401).send('Username on password incorrect');

  // create jwt
  const token = jwt.sign({_id: user._id}, 'secret-token'); //TODO hide token
  res.header('auth-token', token).status(200).send('Login successful');
});

module.exports = router;