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
      expPoints: 0,
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
      var SQLStatement = 'INSERT INTO users_sports(user_id, sport_id)'
      sports.forEach((sport, index) => {
        console.log(sport)
        if(index === 0) {
          SQLStatement  =  SQLStatement + '\n' + `VALUES(${user_id}, ${sport.sport_id})` 
        } else {
          SQLStatement = SQLStatement + '\n' + `,(${user_id}, ${sport.sport_id})`
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
        db.any(`SELECT sports.name, sports.id from users_sports 
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
 * Retrieves all sports that a particular user has associated to them
 * @param {id} userId - Id for the user you want to retrieve the sports from
 * @param {Function} callback - Function that will be called with (err, data) as its arguments and is in charge of sending the response
 */
const getSportsForUser = (userId, callback) => {
  db.any(`SELECT id, name FROM users_sports 
          INNER JOIN sports ON users_sports.sport_id = sports.id
          WHERE user_id = $1`,
         userId)
    .then(sports => callback(null, sports))
    .catch(err => callback(err))
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
  db.any('SELECT username, profile_pic, exp_points FROM users ORDER BY exp_points DESC')
  .then(data => callback(null, data)
  .catch(err => callback(err))
  )
}

const updateUserInfo = (userInfo, callback) => {
  db.none('UPDATE users SET username=${username},fullname=${fullname},' +
  'zip_code= ${zipcode},email=${email}, profile_pic=${picture} WHERE id=${id}', userInfo)
  .then(() => callback(null))
  .catch(err => callback(err))
}

const addSport = (user_id, sport_id, callback) => {
  db
    .none(
      "INSERT INTO users_sports(user_id, sport_id) " +
        "VALUES ($1, $2)",
      [user_id, sport_id]
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const deleteSport = (user_id, sport_id, callback) => {
  db
    .none(
      `DELETE FROM users_sports
        WHERE user_id = $1 AND sport_id = $2`,
     [user_id, sport_id]
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const addEvent = (event, callback) => {
  db.one(
      'INSERT INTO events(host_id, lat, long, start_ts, end_ts, name, location, sport_id, sport_format_id, event_pic, description)' + 
      'VALUES(${host_id}, ${lat}, ${long}, ${start_ts}, ${end_ts}, ${name},' +
      '${location}, ${sport_id}, ${sport_format_id}, ${event_pic}, ${description})'+
      'RETURNING id, host_id, lat, long, start_ts, end_ts, name, location, sport_id, event_pic, description', 
      event)
    .then((insertedEvent) => {
      //Once the event has been created we want the host itself to be joined to the event 
      //we also want the host to be part of team A and of course to be the match judge for team A
      //(even tho it seems obvious) here we do so
      console.log('event ====>', insertedEvent)
      db.any(
        "INSERT INTO players_events(event_id, player_id, team, match_judge) VALUES(${id}, ${host_id}, 'A', TRUE)", 
        insertedEvent) 
        .then(() => {
          const newlyCreatedEvent = {
            ...insertedEvent,
          }
          callback(null, newlyCreatedEvent)
        })
       .catch(err => callback(err));
    })
    .catch(err => callback(err));
}

const cancelEvent = (eventId, callback) => {
  db.one(
    `UPDATE events SET cancelled = TRUE 
     WHERE id = $1
     RETURNING id AS event_id, cancelled`, eventId)
    .then((event) => callback(null, event))
    .catch(err => callback(err));
}

const joinEvent = (joinReq, callback) => {
  db.one(
    'INSERT INTO  players_events(event_id, player_id, team)' +
    'VALUES (${event_id}, ${player_id},  ${team})' +
    'RETURNING event_id, player_id, team', 
    joinReq)
    .then((data) => callback(null, data))
    .catch(err => callback(err));
}

const leaveEvent = (leaveReq, callback) => {
  db.any(
    //Had to switch to from '' to `` (string literal) and from ${} to $// 
    //as the = (character) give me errors when concatenating with + and ${} gave problems when used  
    //with string literals
    `DELETE FROM players_events
    WHERE event_id = $/event_id/ AND player_id = $/player_id/`, 

    leaveReq)
    .then(() => callback(null))
    .catch(err => callback(err));
}

const getEventInfo = (eventId, callback) => {
  console.log('eventId:', eventId)
  db.one(
    `SELECT 
      events.*,
      users.username AS host_username,
      sports.name as sport_name,
      sports_format.description as sport_format,
      sports_format.num_players
    FROM events
    INNER JOIN sports ON sports.id = events.sport_id
    INNER JOIN sports_format ON sports_format.id = events.sport_format_id
    INNER JOIN users ON events.host_id = users.id
    WHERE events.id = $1;`, eventId)
    .then((event) => {
      db.any(
        `SELECT 
          users.id,
          users.username,
          players_events.team,
          players_events.match_judge
        FROM users
        JOIN players_events ON users.id = players_events.player_id
        WHERE players_events.event_id = $1`, eventId)
        .then(players => {
          const eventInfo = {
            ...event,
            players: players
          }
          callback(null, eventInfo)
        })
        .catch(err => callback(err))
    })
    .catch(err => callback(err));
}

const getAllEventsInRadius = (latLongRange, callback) => {
  db.any(
    `SELECT 
      events.*,
      users.username AS host_username,
      sports.name AS sport_name,
      sports_format.description AS sport_format_description
    FROM events
    JOIN sports ON events.sport_id = sports.id
    JOIN sports_format ON events.sport_format_id = sports_format.id
    JOIN users ON events.host_id = users.id
    WHERE lat BETWEEN $/minLat/ AND $/maxLat/
    AND long BETWEEN $/minLon/ AND $/maxLon/`
    , latLongRange)
    .then((data) => callback(null, data))
    .catch(err => callback(err));
}

const getEventsForSportInRadius = (latLongRange, sport_id, callback) => {
  db.any(
    `SELECT 
      events.*,
      users.username AS host_username,
      sports.name AS sport_name,
      sports_format.description AS sport_format_description
    FROM events
    JOIN sports ON events.sport_id = sports.id
    JOIN sports_format ON events.sport_format_id = sports_format.id
    JOIN users ON events.host_id = users.id
    WHERE lat BETWEEN $/minLat/ AND $/maxLat/
    AND long BETWEEN $/minLon/ AND $/maxLon/ AND events.sport_id = $/sport_id/`
    , {...latLongRange, sport_id})
    .then((data) => callback(null, data))
    .catch(err => callback(err));
}

const getSportFormats = (sport_id, callback) => {
  db.any(`SELECT sports_format.*, name FROM sports_format JOIN sports ON sports_format.sport_id = sports.id WHERE sport_id = $1`, sport_id)
    .then((formats) => callback(null, formats))
    .catch(err => callback(err));
}

const startEvent = (startInfo, callback) => {
  db.one(
    `UPDATE events SET actual_start_ts = $/actual_start_ts/ 
     WHERE id = $/event_id/
     RETURNING id AS event_id, actual_start_ts`, startInfo)
    .then((event) => callback(null, event))
    .catch(err => callback(err));
}

const endEventAndAwardPoints = (endInfo, callback) => {
    const winners = endInfo.winner_team_members
    const losers = endInfo.loser_team_members
  db.tx(t => {
    //q1 updates the event setting the actual start and end timestamps and the winner team
    const q1 = t.none(
      `UPDATE events SET actual_end_ts = $/actual_end_ts/, winner_team = $/winner_team/ 
       WHERE id = $/event_id/`,
       endInfo
      )

    //Building one sql statement to update multiple winner users exp_point at once
    if(winners.length) {
      //Base (header) for the SQL statement
      var SQLWinnersStatement = 'UPDATE users SET exp_points = exp_points + 100 WHERE id ='
      winners.forEach((winner, index) => {
        if(index === 0) {
          SQLWinnersStatement  =  SQLWinnersStatement + '\n' + winner.id
        } else {
          SQLWinnersStatement = SQLWinnersStatement + '\n' + `OR id = ${winner.id}`
        }
      })
        SQLWinnersStatement += ';' 
      //q2 updates the exp_points for the winners
      const q2 = t.none(SQLWinnersStatement)
    }

    //Building one sql statement to update multiple loser users exp_point at once
    if(losers.length) {
      //Base (header) for the SQL statement
      var SQLLosersStatement = 'UPDATE users SET exp_points = exp_points + 50 WHERE id ='
      losers.forEach((loser, index) => {
        if(index === 0) {
          SQLLosersStatement  =  SQLLosersStatement + '\n' + loser.id
        } else {
          SQLLosersStatement = SQLLosersStatement + '\n' + `OR id = ${loser.id}`
        }
      })
        SQLLosersStatement += ';' 
      //q2 updates the exp_points for the winners
      const q2 = t.none(SQLLosersStatement)
      return t.batch([q1, q2])
    }
  })
  .then(event => {
    callback(null, {...event, msg: 'points awarded'})
  })
  .catch(err => callback(err));
}

const getEventsUserHosts = (userId, callback) => {
  db.any(
    `SELECT 
      events.*,
      users.username AS host_username,
      sports.name AS sport_name,
      sports_format.description AS sport_format_description
    FROM events
    JOIN sports ON events.sport_id = sports.id
    JOIN sports_format ON events.sport_format_id = sports_format.id
    JOIN users ON events.host_id = users.id
    WHERE events.host_id = $1`, userId)
    .then(events => callback(null, events))
    .catch(err => callback(err))
}

const getEventsUserParticipatedIn = (userId, callback) => {
  db.any(
    `SELECT 
       events.*,
       users.username AS host_username,
       sports.name AS sport_name,
       sports_format.description AS sport_format_description
     FROM events
     JOIN sports ON events.sport_id = sports.id
     JOIN sports_format ON events.sport_format_id = sports_format.id JOIN users ON events.host_id = users.id
     JOIN players_events ON players_events.event_id = events.id
     WHERE players_events.player_id = $1 AND actual_end_ts IS NOT NULL`, userId)
    .then(events => callback(null, events))
    .catch(err => callback(err))
}

module.exports = {
  getUserById: getUserById,
  getUserByUsername:getUserByUsername,
  registerUser: registerUser,
  getUserInfo: getUserInfo,
  getSportsForUser: getSportsForUser,
  getEventsUserHosts: getEventsUserHosts,
  getEventsUserParticipatedIn: getEventsUserParticipatedIn,
  getAllUsers: getAllUsers,
  updateUserInfo: updateUserInfo,
  /*- Sports Related */
  addSport: addSport,
  deleteSport: deleteSport,
  getAllSports: getAllSports,
  getSportFormats: getSportFormats,

  /*- Events Related */
  addEvent: addEvent,
  getEventInfo: getEventInfo,
  getAllEventsInRadius: getAllEventsInRadius,
  getEventsForSportInRadius: getEventsForSportInRadius,
  joinEvent: joinEvent,
  leaveEvent: leaveEvent,
  cancelEvent: cancelEvent,
  startEvent: startEvent,
  endEventAndAwardPoints: endEventAndAwardPoints
};

