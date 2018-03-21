const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const dbAPI = require( '../db/dbAPI') 
const { loginRequired } = require('../auth/helpers')

/* GET users listing. */
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
    console.log('actually calling the function')
    if(err){return err}
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
