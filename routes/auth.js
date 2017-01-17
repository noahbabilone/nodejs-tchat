var express = require('express');
var passport = require('passport');
var user = require('../models/user');

var router = express.Router();

router.get('/signin', function(req, res, next) {
  res.render('auth/signin');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.post('/signin', passport.authenticate('local'), function(req, res){
  res.redirect('/');
});

router.post('/register', function(req, res) {
  user.register(new user({username : req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.redirect("/auth/register");
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
