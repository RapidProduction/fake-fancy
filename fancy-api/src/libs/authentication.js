const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {
  tokenSecret,
  tokenExpiration,
} = require('../configs');

const authenticate = expressJwt({
  secret : tokenSecret,
  credentialsRequired: false,
});

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    tokenSecret,
    { expiresIn: tokenExpiration },
  );
};

const authenticationGuard = (user) => {
  if(!user) {
    throw new Error('Unauthorized');
  }
};

module.exports = {
  authenticate,
  authenticationGuard,
  generateToken,
};