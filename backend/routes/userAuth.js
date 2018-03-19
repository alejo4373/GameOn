const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const dbAPI = require( '../db/dbAPI') 
const { loginRequired } = require('../auth/helpers')

router.post('/signup', (res, req, next) => {
  var user = req.body
  dbAPI.registerUser(user, (err, data) => {})
})


router.post('/login', passport.authenticate('local'), (res, req, next) => { 
  res.status(200)
  res.json(req.user)
});

module.exports = router;
