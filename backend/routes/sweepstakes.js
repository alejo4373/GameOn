const express = require('express');
const router = express.Router();

router.post('/submit', (req, res, next) => {
  try {
    res.status(200).json(req.body)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
