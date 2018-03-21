var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')

/* GET users listing. */
router.get('/getinfo/:userId', function(req, res, next) {
  userId = req.params.userId
  dbAPI.getUserInfo(userId, (err, data) => {
    console.log('callback being called, data: ', data)
    if(err) {
     return next(err)
    }
    res.status(200)
    res.json(data)
  })
});

module.exports = router;
