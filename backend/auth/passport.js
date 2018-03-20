const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbAPI = require('../db/dbAPI');
const helpers = require('./helpers');

//Session configuration
passport.serializeUser((user, done) => {
  done(null, user.username)
});

passport.deserializeUser((username, done) => {
  dbAPI.getUserByUsername(username, (err, user) => {
    done(err, user)
  })
})

//Strategy conf
//The strategy runs first then the serialization 
passport.use(
  new LocalStrategy((username, password, done) => {
      dbAPI.getUserByUsername(username, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false);
        if(!helpers.comparePasswords(password, user.password_digest)) return done(null, false);
        //If none of the above then all went well
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          profilePicUrl: user.profile_pic,
          numberOfPosts:user.number_of_posts,
          numberOfFollowers: user.number_of_followers,
          numberOfFollowing: user.number_of_following
        }
        console.log(user)
        return done(null, userWithoutPassword)
      })
    })
)

module.exports = passport;
