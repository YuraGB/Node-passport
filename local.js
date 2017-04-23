
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');
mongoose.Promise = global.Promise;


/**
 * Expose
 */

exports.local = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    var options = {
      criteria: { email: email }
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
exports.facebook = new FacebookStrategy({
        clientID: "419503005082580", //FACEBOOK_APP_ID,
        clientSecret: "11f8a7958edaefa9abd4a4b5ece572da",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        process.nextTick(()=>{
            console.log( profile.id, accessToken, refreshToken);

        User.findOne({name: profile.id}, function (err, user) {

            if (err) cb(err);
            if(user){
                console.log( profile.id, user.id);
                return cb(null, user)
            }
            else {
                cb(null, profile)
            }

        })}
        )}
);