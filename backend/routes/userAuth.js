const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const dbAPI = require( '../db/dbAPI')
const { loginRequired } = require('../auth/helpers')

router.post('/signup', (req, res, next) => {
  var user = req.body
  dbAPI.registerUser(user, (err, registeredUser) => {
    if(err) {
      return next(err)
    }

    //Log in user automatically after sign up
    req.login(registeredUser, function(err) {
      if (err) { return next(err); }
      return res.json({
        user: registeredUser,
        msg: `Welcome ${req.user.username} you have created an account and logged in automatically`
      })
    });
  })
})

router.post('/login', passport.authenticate('local'), (req, res, next) => { 
  res.status(200)
  res.json({
    user: req.user,
    msg: `Welcome ${req.user.username}! You have logged in` 
  })
});

router.get('/logged', loginRequired, (req, res, next) =>{
  res.status(200)
  res.json({
    loggedin: true
  })
  res.send('user is properly logged in')
})

router.get('/logout',loginRequired, (req, res, next) => {
  req.logout();
  res.status(200)
  res.json({
    msg: 'user has successfully logged out'
  })
})
module.exports = router;
