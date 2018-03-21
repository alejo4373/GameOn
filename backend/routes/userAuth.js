const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const dbAPI = require('../db/dbAPI');
const { loginRequired } = require('../auth/helpers');

router.post('/signup', (req, res, next) => {
  var user = req.body
  dbAPI.registerUser(user, (err) => {
    if(err) {
      next(err)
    }

    //login the user automaticlly after sign up
    req.login(user, function(err) {
      if (err) {return next(err);}
      return res.json({ msg: "user loged in", user: req.user });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.status(200);
  res.json(req.user);
});

router.get('/hello', loginRequired, (req, res, next) => {
  res.status(200);
  res.send('user is properly logged in');
});

router.get('/logout', loginRequired, (req, res, next) => {
  req.logout();
  res.status(200);
  res.json({
    message: 'user has successfully logged out'
  });
});
module.exports = router;
