var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired } = require('../auth/helpers')


/* GET users listing. */
router.get('/getinfo/', loginRequired, function(req, res, next) {
  //Get the id for the logged in user traveling in the req.user
  userId = req.user.id  
  dbAPI.getUserInfo(userId, (err, userInfo) => {
    if(err) {
     return next(err)
    }
    res.status(200)
    res.json({
      user: userInfo,
      msg: `Retrieved user info for ${userInfo.username}`
    })
  })
});

module.exports = router;
