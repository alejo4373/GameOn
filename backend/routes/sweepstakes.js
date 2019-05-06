const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/submit', async (req, res, next) => {
  try {
    await db.any('INSERT INTO sweepstakes(time_stamp, email, body) VALUES(${time_stamp}, ${email}, ${body})', {
      time_stamp: new Date().toISOString(),
      email: req.body.Email,
      body: JSON.stringify(req.body)
    })
    res.status(200).json(req.body)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
