/* CREATE/HOST AN EVENT */
//URL: http://localhost:3100/event/add
//To register a user make sure the information is being sent in the following format/shape
//and is traveling in a POST request's body 
//SEND:
req.body = { 
  lat: '70.7487387',
  long: '-80.9323594',
  start_ts: '1521774233284',
  end_ts: '1521775961187',
  event_pic: '/images/event.png',
  name: 'Wanna be Messi?',
  description: '11x11 bring snacks',
  'location ': 'Hunter\'s Point South Park',
  sport_id: '2' 
}
 // ==> Server returns
res.data = {
    "event": {
        "id": 3,
        "host_id": 1,
        "lat": 70.7487387,
        "long": -80.9323594,
        "start_ts": "1521774233284",
        "end_ts": "1521775961187",
        "name": "Wanna be Messi?",
        "location": "Hunter's Point South Park",
        "sport_id": "2",
        "event_pic": "/images/event.png",
        "description": "11x11 bring snacks"
    },
    "msg": "Created new event"
}

/* JOIN EVENT  */
//URL: http://localhost:3100/event/join
//REQUEST: POST
//SEND:
