var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var home = require('./routes/home');
var register = require('./routes/register');
var joinable = require('./routes/joinable');
var dashboard = require('./routes/dashboard');
var create_group = require('./routes/create_group');
var profile = require('./routes/profile');
var myprofile = require('./routes/myprofile');
var group = require('./routes/group');
var layout = require('./routes/layout');
var history = require('./routes/history');
var modify = require('./routes/modify');
// var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use('/register', register);
app.use('/joinable', joinable);
app.use('/dashboard', dashboard);
app.use('/create_group', create_group);
app.use('/profile', profile);
app.use('/myprofile', myprofile);
app.use('/group', group);
app.use('/layout', layout);
app.use('/history', history);
app.use('/modify', modify);

app.locals.moment = require('moment');
// app.use('/test', test);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
