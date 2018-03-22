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
