var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired } = require('../auth/helpers')

router.get('/getinfo/:userId?', loginRequired, function(req, res, next) {
  var userId = req.params.userId
  //If we dont request a particular userId in the params
  if(!userId) {
    //Get the id for the logged in user traveling in the req.user
    userId = req.user.id  
  }
  console.log('userId', userId)
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

router.get('/all', loginRequired, (req, res, next) =>{
  dbAPI.getAllUsers((err,data)=>{
    if(err){
      next(err)
    }
    res.status(200).json({
      msg:'all users retrieved',
      data: data
    })
  })
})

router.patch('/edit', loginRequired, (req, res, next) => {
 let user = req.body
  dbAPI.updateUserInfo(user, (err) => {
    if(err){return err}
    res.status(200)
    res.json({
      msg: 'User\'s information updates'
    })
  })
})

module.exports = router;
