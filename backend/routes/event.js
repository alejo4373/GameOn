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

//Should we delete the event from database or simply add a status
//active|canceled|finished in the db and just flip that value 
//for now it is DELETEing the record
router.delete('/delete', loginRequired, (req, res, next) => {
  const deleteReq = {
    event_id: req.body.event_id,
    host_id: req.user.id //Currently logged in user
  }

  dbAPI.deleteEvent(deleteReq, (err, data) => {
    if(err) { return next(err) }
    res.status(200)
    res.json({
      event_id: req.body.event_id,
      msg: 'You deleted this event'
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


module.exports = router;