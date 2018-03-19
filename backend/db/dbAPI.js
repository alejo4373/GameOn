const db = require("./index");
const helpers = require('../auth/helpers');

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
      profilePicUrl: '/images/user.png',
      expPoints: 50,
      email: user.email,
      sports: user.sports
  }
  db.none('INSERT INTO users(username, fullname, password_digest, profile_pic, number_of_posts, number_of_followers, number_of_following )' +
          'VALUES (${userName}, ${fullName}, ${passwordDigest}, ${profilePicUrl}, ${numberOfPosts}, ${numberOfFollowers}, ${numberOfFollowing})', newUser)
  .then(()=> {
    var user_id = 1 //Hardcoded
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

    db.none(SQLStatement)
      .then(() => callback(null))
      .catch((err) => callback(err))
  })
  .catch(err => callback(err))
}
//expecting an obj for our post
const addPosts = (postObj, callback) => {
  db.none('INSERT INTO posts(owner_id, imageurl) VALUES (${ownerId}, ${imageUrl})', postObj)
  .then(() => callback(null))
  .catch(err => callback(err))
}

// const follow = ()

const getPosts = (username, callback) => {
  db
    .any(
      "SELECT * FROM posts WHERE owner_id = (SELECT id FROM users WHERE username = ${username})",
      {username:username}
    )
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const postLikes = (likesObj, callback) => {
  db
  .none(
    "INSERT INTO likesTable(post_id, liked_by) VALUES (${postId}, ${likedBy})", likesObj)
  .then(() => callback(null))
  .catch(err => callback(err))
};

const getLikes = (postId, callback) => {
  db.any('SELECT liked_by FROM likesTable WHERE post_id =${postId}', {postId:postId})
  .then(data => callback(null, data))
  .catch(err => callback(err, false))
}


const getFeed = (username, callback) => {
  db
    .any(
      "SELECT * FROM posts WHERE owner_id = ANY(SELECT follower_id FROM followinfo INNER JOIN users ON followinfo.owner_id = users.id WHERE users.username = ${username})",
      {username:username}
    )
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const addFollower = (ownerId, followerId, callback) => {
  db.none('INSERT INTO followinfo (owner_id, follower_id) VALUES(${ownerId}, ${followerId})', {ownerId, followerId})
    .then(() => callback(null))
    .catch(err => callback(err, false))
}

module.exports = {
  getUserByUsername: getUserByUsername,
  registerUser: registerUser,
  addPosts: addPosts,
  getPosts: getPosts,
  postLikes: postLikes,
  getLikes: getLikes,
  getFeed: getFeed,
  addFollower: addFollower,
};
