const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failuresFlash: true,
  }));

router.get('/profile', (req, res) => {
  res.send('this is yout profile')
})

module.exports = router;