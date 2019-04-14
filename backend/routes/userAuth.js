const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const dbAPI = require( '../db/dbAPI')
const { loginRequired } = require('../auth/helpers')

router.post('/signup', (req, res, next) => {
  var user = req.body
  dbAPI.registerUser(user, (err, registeredUser) => {
    if(err) {
      if(err.code === '23505') {
        return (
          res.status(403)
             .json({
                user: null, 
                msg: 'This username isn\'t available. Please try another.'
             }) 
        )
      }
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) { return next(err); }
    if(!user) { 
      return res.status(401)
         .json({
           user: null, 
           msg: 'Invalid username or password. Please try again'
         }) 
    }
    
    // LocalStrategy verified user exists and has valid credentials
    // Serializes user establishing a session
    req.login(user, (err) => {
      if(err) { 
        return next(err) 
      }
      //Else auth successful
      res.status(200)
      res.json({
        user: req.user,
        msg: `Welcome ${req.user.username}! You have logged in` 
      })
    })
  })(req, res, next)
})

router.get('/logged', loginRequired, (req, res, next) =>{
  res.status(200)
  res.json({
    user: req.user,
    msg: `Welcome back ${req.user.username}`
  })
})

router.get('/logout',loginRequired, (req, res, next) => {
  req.logout();
  res.status(200)
  res.json({
    msg: 'user has successfully logged out'
  })
})
module.exports = router;
