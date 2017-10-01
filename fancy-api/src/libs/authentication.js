// We are following the JWT Token specification
// Where you can find out on https://jwt.io/

const HEADER_REGEX = /bearer token-(.*)$/;

const extractAuthenticationHeader = async ({ headers: { authorization } }, User) => {
  console.log(authorization)
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  return email && await User.findOne({email});
};

const authenticated = (user) => {
  if (!user) {
    throw new Error('Unauthenticated');
  }
};

module.exports = {
  extractAuthenticationHeader,
  authenticated,
};