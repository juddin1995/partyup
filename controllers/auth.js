const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error('Password & confirmation do not match');
    }
    req.body.password = bcrypt.hashSync(req.body.password, 6);
    const user = await User.create(req.body);
    req.session.user = { _id: user._id };
    req.session.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = { _id: user._id };
      req.session.save();
      // Perhaps update to some other functionality
      return res.redirect('/');
    } else {
      return res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/login', async (req, res) => {
  res.render('auth/login.ejs');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;