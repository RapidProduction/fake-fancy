const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const passport = require('passport');

const setupPassportStrategies = (User) => {
  // Local login strategy
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

  // Authenticated session management
  // passport.use('provider', new OAuth2Strategy(
  //   {
  //     authorizationURL: 'https://www.provider.com/oauth2/authorize',
  //     tokenURL: 'https://www.provider.com/oauth2/token',
  //     clientID: '123-456-789',
  //     clientSecret: 'shhh-its-a-secret',
  //     callbackURL: 'https://www.example.com/auth/provider/callback'
  //   },
  //   (accessToken, refreshToken, profile, done) => {
  //     User.findOrCreate(..., function(err, user) {
  //       done(err, user);
  //     });
  //   })
  // );
};

module.exports = setupPassportStrategies;
