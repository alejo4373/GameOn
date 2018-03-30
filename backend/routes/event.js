var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')
var { loginRequired } = require('../auth/helpers')
var geo = require('../db/GeoLocation.js')

router.post('/add', loginRequired, (req, res, next) => {
  const event = {
    ...req.body,
    host_id: req.user.id, //currently logged in user
    host_username: req.user.username
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
  const joinReq = {
    event_id: req.body.event_id,
    team: req.body.team,
    player_id: req.user.id //Currently logged in user
  }

  dbAPI.joinEvent(joinReq, (err, joinRes) => {
    console.log('working on this end')
    if(err) { return next(err) }
    res.status(200)
    res.json({
      joinRes: joinRes,
      msg: 'You have successfully joined this event'
    })
  })
})

router.delete('/leave', loginRequired, (req, res, next) => {
  const leaveReq = {
    event_id: req.body.event_id,
    player_id: req.user.id //Currently logged in user
  }

  dbAPI.leaveEvent(leaveReq, (err, leaveRes) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      leaveRes: leaveRes,
      msg: 'You have left this event'
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

router.get('/radius', loginRequired, (req, res, next) => {
  const { radius, lat, long, sport_id } = req.query 
  console.log('sport_id', sport_id)
  //using helper library to get range of lat and long for the given
  //radius
  const locationRange = geo.buildLocationRange(
    Number.parseFloat(lat),
    Number.parseFloat(long),
    Number(radius)
  )

  const callback = (err, events) =>{
    if(err) { return next(err) }
    res.status(200)
    res.json({
      events: events,
      msg: 'Events retrieved'
    })
  }

  if(!sport_id){
   return dbAPI.getAllEventsInRadius(locationRange, callback)
  }
  dbAPI.getEventsForSportInRadius(locationRange, sport_id, callback)
})

router.patch('/start/:eventId', loginRequired, (req, res, next) => {
  const startInfo = {
    event_id: req.params.eventId,
    actual_start_ts: Number(req.body.actual_start_ts)
  }
   dbAPI.startEvent(startInfo, (err, event) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event: event,
      msg: 'Event started'
    })
  }) 
})

router.patch('/end/:eventId', loginRequired, (req, res, next) => {
  const endInfo = {
    event_id: req.params.eventId,
    actual_end_ts: Number(req.body.actual_end_ts)
  }
   dbAPI.endEvent(endInfo, (err, event) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event: event,
      msg: 'Event ended'
    })
  }) 
})

router.patch('/cancel/:eventId', loginRequired, (req, res, next) => {
  const { eventId } = req.params
   dbAPI.cancelEvent(eventId, (err, event) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event: event,
      msg: 'Event ended'
    })
  }) 
})
module.exports = router;