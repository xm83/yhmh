var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');

// hash password
var crypto = require('crypto');

var models = require('./models');
var User = models.User;

// import authentication pathway and routes
var auth = require('./auth');
var routes = require('./index');


// require node modules
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

// Passport setup
app.use(session({
  secret: process.env.MYSECRET,
  store: new MongoStore({mongooseConnection:
  require('mongoose').connection})
}));


app.use(passport.initialize());
app.use(passport.session());

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}


// Tell passport how to read our user models
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  // hash password
  const hash = hashPassword(password);
  console.log("email:", email);
  // first try local strategy
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log('error: ', err);
      return done(err);
    } else if (!user) {
      console.log('no user');
      return done(null, false, { message: 'incorrect email' });
    } else if (hash !== user.password) {
      console.log('password not right');
      return done(null, false, { message: 'incorrect password' });
    }
    console.log('success');
    return done(null, user);
  });
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // callbackURL: "/auth/facebook/callback",
    callbackURL: process.env.SERVER_URI + "/auth/facebook/callback" || "http://localhost:3000/auth/facebook/callback",
    // callbackURL: "http://" + process.env.DOMAIN + "auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      facebookId: profile.id,
        username: profile.displayName
    }, { phone: process.env.FROM_PHONE }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
    console.log('serialize user:', user);
    done(null, user._id); 
  });
passport.deserializeUser((userId, done) => {
    console.log('deserialize id:', userId);
    User.findById(userId, (err, user) => {
        if (err) {
        done(err);
        } else {
        done(null, user);
        }
    });
});

app.use('/', auth(passport));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
