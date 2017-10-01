const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { tokenSecret } = require('../configs');

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
    { expiresIn: '15m' }
  );
};

module.exports = {
  authenticate,
  generateToken,
};