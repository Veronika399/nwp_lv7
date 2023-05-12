const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const { validatePassword } = require('./passwordUtils');

const verifyCallback = (username, password, done) => {
    User.findOne({username : username})
        .then((user) => {
            if(!user) { return done(null, false)}

            const isValid = validatePassword(password, user.hash, user.salt);

            if(isValid){
                return done(null, user)
            }
            else{
                return done(null, false)
            }
        }).catch((err) => {
            done(err);
        })
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser(function(user, done) {
    process.nextTick(function() {
      done(null, { _id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(userId, done) {
    process.nextTick(function() {
      User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
    });
  });