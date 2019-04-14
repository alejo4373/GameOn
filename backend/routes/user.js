var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired, editUsername } = require('../auth/helpers')

router.get('/details/:userId?', loginRequired, function(req, res, next) {
  var userId = req.params.userId
  //If we dont request a particular userId in the params
  if(!userId) {
    //Get the id for the logged in user traveling in the req.user
    userId = req.user.id  
  }
  console.log('userId', userId)
  dbAPI.getUserDetails(userId, (err, userInfo) => {
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
    if(err){return next(err)}
    res.status(200)
    res.json({
      msg: 'user\'s infomation updates'
    })
  })
})

router.get('/sports', loginRequired, (req, res, next) => {
 let userId = req.user.id
  dbAPI.getSportsForUser(userId, (err, sports) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      sports: sports,
      msg: 'All sports for user retrieved'
    })
  })
})

router.get('/events', loginRequired, (req, res, next) => {
  var userId = req.query.user_id
  //If we dont request a particular userId in the query
  if(!userId) {
    //Get the id for the logged in user traveling in the req.user
    userId = req.user.id  
  }
  dbAPI.getEventsUserHosts(userId, (err, events) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      events: events,
      msg: 'All events hosted by user retrieved'
    })
  })
})

router.get('/events/history', loginRequired, (req, res, next) => {
  var userId = req.query.user_id
  //If we dont request a particular userId in the query
  if(!userId) {
    //Get the id for the logged in user traveling in the req.user
    userId = req.user.id  
  }
  dbAPI.getEventsUserParticipatedIn(userId, (err, events) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      events: events,
      msg: 'All events hosted by user retrieved'
    })
  })
})

module.exports = router;
