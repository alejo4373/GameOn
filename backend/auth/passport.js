const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbAPI = require('../db/dbAPI');
const helpers = require('./helpers');

// sets req.session.passport with the user
// on a login/authenticate request
passport.serializeUser((user, done) => {
  done(null, user)
});

// sets req.user by bringing user from database based on the id saved in the session
// it does it for every subsequent request
passport.deserializeUser((userInSession, done) => {
  dbAPI.getUserById(userInSession.id, (err, user) => {
    delete user.password_digest;
    done(err, user)
  })
})

//Strategy conf
//The strategy runs first then the serialization 
passport.use(
  new LocalStrategy((username, password, done) => {
      dbAPI.getUserByUsername(username, (err, user) => {
        if(err) {
          done(err);
        } else if(!user || !helpers.comparePasswords(password, user.password_digest)) {
           done(null, false);
        }
        delete user.password_digest;
        done(null, user)
      })
    })
)

module.exports = passport;
