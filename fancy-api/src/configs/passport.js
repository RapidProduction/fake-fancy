const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const passport = require('passport');

const setupPassportStrategies = (User) => {
  passport.use('local', new LocalStrategy(
    async (username, password, done) => {
      const user = await User.findOne({ email: username });
      if(user && bcrypt.compareSync(password, user.password)) {
        done(null, user);
      }
      done('Invalid username or password');
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(id, (error, user) => {
      done(null, user);
    });
  });
};

module.exports = setupPassportStrategies;
