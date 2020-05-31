const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedin, isNotLogedIn } = require('../lib/auth')

router.get('/signin', isNotLogedIn, (req, res) => {
  res.render('auth/signin');
})

router.post('/signin', isNotLogedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
})

router.get('/signup', isNotLogedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLogedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failuresFlash: true,
}));

router.get('/profile', isLoggedin, (req, res) => {
  res.render('profile');
})

router.get('/logout', isLoggedin, (req, res) => {
  req.logout();
  res.redirect('signin');
});

module.exports = router;