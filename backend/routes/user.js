var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired, editUsername } = require('../auth/helpers')


/* GET users listing. */
router.get('/getinfo', loginRequired, function(req, res, next) {
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

router.get('/all', loginRequired, (req, res, next) =>{
  dbAPI.getAllUsers((err,data)=>{
    if(err){
      next(err)
    }
    res.status(200).json({
      message:'all users retrieved',
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
      message: 'user\'s infomation updates'
    })
  })
})

router.delete('/sport/delete', loginRequired, (req, res, next) => {
  let sport = req.body
  console.log(sport)
  dbAPI.deleteSport(sport, (err) => {
    if(err){return err}
    res.status(200)
    res.json({
      message: 'sport deleted'
    })
  })
})

router.post('/sport/add', loginRequired, (req, res, next) => {
  let sport = req.body
  console.log(sport)
  dbAPI.addSport(sport, (err) => {
    if(err){return err}
    res.status(200)
    res.json({
      message: 'sport added'
    })
  })
})

module.exports = router;
