var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')

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

module.exports = router;
