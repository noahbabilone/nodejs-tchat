var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var user = require('./models/user');
var channel = require('./models/channel');
var message = require('./models/message');

var index = require('./routes/index');
var channel_api = require('./routes/api/channel');
var message_api = require('./routes/api/message');
var auth = require('./routes/auth');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(require('express-session')({
  secret : 'Dear Princess Celestia',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use(passport.initialize());
app.use(passport.session());


var user = require('./models/user');
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use('/', index);
app.use('/api/channel', channel_api);
app.use('/api/message', message_api);
app.use('/auth', auth);

mongoose.connect('mongodb://localhost:27017/frock');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
