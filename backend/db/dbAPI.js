const db = require("./index");
const helpers = require("../auth/helpers");

const getUserByUsername = (username, callback) => {
  db
    .any("SELECT * FROM users WHERE username = ${username}", {
      username: username
    })
    .then(data => callback(null, data[0]))
    .catch(err => {
      callback(err, false);
    });
};

const registerUser = (user, callback, req, res) => {
  const newUser = {
    userName: user.username,
    fullName: user.fullname,
    passwordDigest: helpers.generatePasswordDigest(user.password),
    zipcode: user.zipcode,
    profilePicUrl: "/images/user.png",
    expPoints: 50,
    email: user.email,
    sports: user.sports,
    zipcode: user.zipcode
  };
  const sports = JSON.parse(newUser.sports);
  console.log(sports);
  db
    .one(
      "INSERT INTO users(fullname, username, email, password_digest, zip_code, profile_pic, exp_points)" +
        "VALUES (${fullName}, ${userName}, ${email}, ${passwordDigest}, ${zipcode}, ${profilePicUrl}, ${expPoints})" +
        "RETURNING id",
      newUser
    )
    .then(user => {
      var user_id = user.id; //Hardcoded
      if (sports && sports.length) {
        var SQLStatement =
          "INSERT INTO sports_proficiency (user_id, sport_id, proficiency)";
        sports.forEach((sport, index) => {
          console.log(sport);
          if (index === 0) {
            SQLStatement =
              SQLStatement +
              "\n" +
              `VALUES(${user_id}, ${sport.sport_id}, ${sport.proficiency})`;
          } else {
            SQLStatement =
              SQLStatement +
              "\n" +
              `,(${user_id}, ${sport.sport_id}, ${sport.proficiency})`;
          }
        });
        SQLStatement += ";";

        db
          .none(SQLStatement)
          .then(() => callback(null))
          .catch(err => callback(err));
      }
    })
    .catch(err => callback(err));
};
//expecting an obj for our post
const addPosts = (postObj, callback) => {
  db
    .none(
      "INSERT INTO posts(owner_id, imageurl) VALUES (${ownerId}, ${imageUrl})",
      postObj
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};
const getPosts = (username, callback) => {
  db
    .any(
      "SELECT * FROM posts WHERE owner_id = (SELECT id FROM users WHERE username = ${username})",
      { username: username }
    )
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const addLike = (likesObj, callback) => {
  db
    .none(
      "INSERT INTO likesTable(post_id, liked_by) VALUES (${postId}, ${likedBy})",
      likesObj
    )
    .then(() => callback(null))
    .catch(err => callback(err));
};

const getLikes = (userId, callback) => {
  db
    .any(
      "SELECT * FROM likesTable WHERE post_id = ANY(SELECT id FROM posts WHERE owner_id = ANY(SELECT owner_id FROM followinfo WHERE follower_id = ${userId}))",
      { userId: userId }
    )
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const getFeed = (userId, callback) => {
  db
    .any(
      "SELECT * FROM posts WHERE owner_id = ANY(SELECT owner_id FROM followinfo INNER JOIN users ON followinfo.owner_id = users.id WHERE follower_id = ${userId})",
      { userId: userId }
    )
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const addFollower = (ownerId, followerId, callback) => {
  db
    .none(
      "INSERT INTO followinfo (owner_id, follower_id) VALUES(${ownerId}, ${followerId})",
      { ownerId, followerId }
    )
    .then(() => callback(null))
    .catch(err => callback(err, false));
};

const getFollows = callback => {
  db
    .any("SELECT owner_id, follower_id from followInfo")
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};
// const follow = ()
const getAllUsers = callback => {
  db
    .any("SELECT username, profile_pic, exp_points from users")
    .then(data => callback(null, data))
    .catch(err => callback(err, false));
};

const updateUserInfo = (userInfo, callback) => {
  db
    .one(
      "UPDATE users SET username=${username},fullname=${fullname}, email=${email},zipcode=${zipcode}" +
        ", profile_pic=${profilePic} WHERE id=${id}" +
        " RETURNING id",
      userInfo
    )
    .then(
      db
        .none(SQLStatement)
        .then(() => callback(null))
        .catch(err => callback(err))
    );
};

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

module.exports = {
  getUserByUsername: getUserByUsername,
  registerUser: registerUser,
  getAllUsers: getAllUsers,
  updateUserInfo: updateUserInfo,
  addSport: addSport,
  deleteSport: deleteSport,
  addPost: addPost,
  getPosts: getPosts,
  addLike: addLike,
  getLikes: getLikes,
  getFeed: getFeed,
  addFollower: addFollower,
  getFollows: getFollows
};
