require('dotenv').config({ path: "./.env.local" });
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");


var user = require('./routes/user');
var auth = require('./routes/userAuth');
var sport = require('./routes/sport');
var event = require('./routes/event');
var sweepstakes = require('./routes/sweepstakes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {
  skip: (req, res) => {
    return req.url.includes("images") || req.url.includes("icons")
}}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret:
      "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', auth);
app.use('/user', user);
app.use('/sport', sport);
app.use('/event', event);
app.use('/sweepstakes', sweepstakes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).json({ 
    msg: "Oops! we are experiencing problems, please try again later." 
  });
});

module.exports = app;
