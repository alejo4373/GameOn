var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired } = require('../auth/helpers')


router.post('/add', loginRequired, (req, res, next) => {
  const event = {
    ...req.body,
    host_id: req.user.id, //currently logged in user
  }

  dbAPI.addEvent(event, (err, createdEvent) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event: createdEvent,
      msg: 'Created new event'
    })
  })
})

router.post('/join', loginRequired, (req, res, next) => {
  const invitationInfo = {
    event_id: req.body.event_id,
    invitee_id: req.body.invitee_id,
  }

  dbAPI.joinEvent(joinInfo, (err, player) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      invite: invite,
      msg: 'Invitation added'
    })
  })
})

router.get('/info/:eventId', loginRequired, (req, res, next) => {
  const { eventId } = req.params 
  dbAPI.getEventInfo(eventId, (err, event) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event: event,
      msg: 'Event retrieved'
    })
  })
})

module.exports = router;