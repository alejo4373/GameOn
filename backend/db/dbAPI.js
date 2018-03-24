const db = require("./index");
const helpers = require('../auth/helpers');

const getUserById = (id, callback) => {
  db
    .any(
      "SELECT * FROM users WHERE id = ${id}",
      {id: id}
    )
    .then(data => callback(null, data[0]))
    .catch(err => {
      callback(err, false)
    });
};

const getUserByUsername = (username, callback) => {
  db
    .any(
      "SELECT * FROM users WHERE username = ${username}",
      {username: username}
    )
    .then(data => callback(null, data[0]))
    .catch(err => {
      callback(err, false)
    });
};

const registerUser = (user, callback) => {
  const newUser = {
      userName: user.username,
      fullName: user.fullname,
      passwordDigest: helpers.generatePasswordDigest(user.password),
      zipcode: user.zipcode,
      profilePicUrl: '/images/user.png',
      expPoints: 50,
      email: user.email,
      sports: user.sports,
      zipcode: user.zipcode
  }
  const sports = JSON.parse(newUser.sports)
  console.log(sports)
  db.one('INSERT INTO users(fullname, username, email, password_digest, zip_code, profile_pic, exp_points)' +
          'VALUES (${fullName}, ${userName}, ${email}, ${passwordDigest}, ${zipcode}, ${profilePicUrl}, ${expPoints})'+ 
          'RETURNING id, username, fullname, profile_pic', newUser)
  .then((user)=> {
    //id assigned by the database to the newly created user
    var user_id = user.id 
    //Check if the user selected some sports for each sport we in a hacky not sure if good way 
    //concatenate a SQL statement string so that we insert that data in one INSERT statement at once
    //if the user didn't picked any sport then skip this step altogether 
    if(sports.length) {
      //Base (header) for the SQL statement
      var SQLStatement = 'INSERT INTO sports_proficiency (user_id, sport_id, proficiency)'
      sports.forEach((sport, index) => {
        console.log(sport)
        if(index === 0) {
          SQLStatement  =  SQLStatement + '\n' + `VALUES(${user_id}, ${sport.sport_id}, ${sport.proficiency})` 
        } else {
          SQLStatement = SQLStatement + '\n' + `,(${user_id}, ${sport.sport_id}, ${sport.proficiency})`
        }
      })
      SQLStatement += ';' 

      //Feeding that SQL statement into the db instance of pg-promise
      db.none(SQLStatement)
        .then(() => callback(null, user))
        .catch((err) => callback(err))
    }
  })
  .catch(err => callback(err))
}

/**
 * Retrieves user information relevant to their profile
 * @param {string} userId - The user id to grab the info from
 * @param {Function} answer - Function that will be called with (err, data) as its arguments
 */
const getUserInfo = (userId, answer) => {
  console.log(userId)
   db.one(`SELECT id, username, fullname, email, zip_code, profile_pic, exp_points FROM users 
           WHERE id = $1`, userId) 
      .then(user => {
        db.any(`SELECT sports.name, sports.id, proficiency from sports_proficiency 
                INNER JOIN sports ON sports.id = sport_id
                WHERE user_id = $1`, userId)
          .then(sports => {
            //Aggregating info from both queries into one object
            var userInfo = {...user, sports:sports}
            return answer(null, userInfo)
          })
          .catch(err => answer(err, null))
   })
    .catch(err =>  answer(err, null))
}


/**
 * Retrieves all sports with their respective id
 * @param {Function} callback - Function that will be called with (err, data) as its arguments and is in charge of sending the response
 */
const getAllSports = (callback) => {
  db
    .any("SELECT * FROM sports")
    .then(sports => callback(null, sports))
    .catch(err => callback(err, false));
}

const getAllUsers = (callback) => {
  db.any('SELECT username, profile_pic, exp_point FROM users ORDER BY exp_points DESC')
  .then(data => callback(null, data)
  .catch(err => callback(err))
  )
}

const updateUserInfo = (userInfo, callback) => {
  db.none('UPDATE users SET username=${username},fullname=${fullname},' +
  'zip_code= ${zipcode},email=${email} WHERE id=${id}', userInfo)
  .then(() => callback(null))
  .catch(err => callback(err))
}

const updateSport = (sports, callback) => {
  const sport = JSON.parse(sports.sport)
    db.none(`UPDATE sports_proficiency SET proficiency = ${sport.proficiency} WHERE user_id = ${sports.id} AND sport_id = ${sport.sport_id}`)
    .then(() => callback(null))
    .catch(err => callback(err))
}

const addSport = (sport, callback) => {
  console.log("sport", sport);
  db
    .none(
      "INSERT INTO sports_proficiency(user_id, sport_id, proficiency) " +
        "VALUES (${user_id}, ${sport_id}, ${proficiency})",
      sport
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const deleteSport = (sport, callback) => {
  db
    .none(
      "DELETE FROM sports_proficiency " +
        "WHERE user_id = ${user_id} AND sport_id = ${sport_id}",
      sport
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const addEvent = (event, callback) => {
  //How the event should look like coming from the frontend
  // var event = {
  //   host_id: 2,
  //   lat: 40.747387,
  //   long: -73.949494,
  //   start_ts: 1521774233284,
  //   end_ts: 1521775961187,
  //   event_pic: '/images/event.png'
  // }
  db.one(
      'INSERT INTO events(host_id, lat, long, start_ts, end_ts, name, location, sport_id, event_pic, description)' + 
      'VALUES(${host_id}, ${lat}, ${long}, ${start_ts}, ${end_ts}, ${name},' +
      '${location}, ${sport_id}, ${event_pic}, ${description})'+
      'RETURNING id, host_id, lat, long, start_ts, end_ts, name, location, sport_id, event_pic, description', 
      event)
    .then((insertedEvent) => {
      //Once the event has been created we want the host itself to be joined to the event 
      //(even tho it seems odious) here we do soo
      console.log('event ====>', insertedEvent)
      db.any(
        'INSERT INTO players_events(event_id, player_id) VALUES(${id}, ${host_id})', 
        insertedEvent) 
        .then(() => {
          const newlyCreatedEvent = {
            ...insertedEvent,
            //The following 2 lines are being sent back to keep the data consistent when getting info
            //about an event either when is newly created or when requested with id by client
            players_usernames: [event.host_username], 
            players_ids: [event.host_id]
          }
          callback(null, newlyCreatedEvent)
        })
       .catch(err => callback(err));
    })
    .catch(err => callback(err));
}

const joinEvent = (joinReq, callback) => {
  db.one(
    'INSERT INTO  players_events(event_id, player_id)' +
    'VALUES (${event_id}, ${player_id})' +
    'RETURNING event_id, player_id', 
    joinReq)
    .then((data) => callback(null, data))
    .catch(err => callback(err));
}

const getEventInfo = (eventId, callback) => {
  console.log('eventId:', eventId)
  db.one(
    `SELECT 
      events.*,
      json_agg(users.username) AS players_usernames,
      json_agg(users.id) AS players_ids
    FROM users
    INNER JOIN players_events ON players_events.player_id = users.id
    INNER JOIN events ON events.id = players_events.event_id
    WHERE players_events.event_id = $1
    GROUP BY(events.id)`, eventId)
    .then((data) => callback(null, data))
    .catch(err => callback(err));
}
module.exports = {
  getUserById: getUserById,
  getUserByUsername:getUserByUsername,
  registerUser: registerUser,
  getUserInfo: getUserInfo,
  getAllSports: getAllSports,
  getAllUsers: getAllUsers,
  updateUserInfo: updateUserInfo,
  updateSport: updateSport,
  addSport: addSport,
  deleteSport: deleteSport,

  /*- Events Related */
  addEvent: addEvent,
  joinEvent: joinEvent,
  getEventInfo: getEventInfo
};

