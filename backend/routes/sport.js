var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired } = require('../auth/helpers')

router.get('/all', function(req, res, next) {
  dbAPI.getAllSports((err, sports) => {
    if(err) {
     return next(err)
    }
    res.status(200)
    res.json({
      sports: sports,
      msg: 'Retrieved all sports'
    })
  })
});

//Required change so that a logged in user cannot change another user' sports
router.post('/add', loginRequired, (req, res, next) => {
  const user_id = req.user.id
  const sport_id = req.body.sport_id
  console.log('Add:', user_id, '--', sport_id)
  dbAPI.addSport(user_id, sport_id, (err) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      msg: 'Sport added'
    })
  })
})

//Same as above
router.delete('/delete', loginRequired, (req, res, next) => {
  const user_id = req.user.id
  const sport_id = req.body.sport_id
  console.log(user_id, '--', sport_id)
  dbAPI.deleteSport(user_id, sport_id, (err) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      msg: 'Sport deleted'
    })
  })
})

router.patch('/edit', loginRequired, (req, res, next) => {
  let sport = req.body
  console.log('sports', sport)
  dbAPI.updateSport(sport, (err) => {
    if(err){return next(err)}
    res.status(200)
    res.json({
      message: 'sport updated'
    })
  })
})

module.exports = router;
