// We are following the JWT Token specification
// Where you can find out on https://jwt.io/

const HEADER_REGEX = /bearer token-(.*)$/;

const extractAuthenticationHeader = async ({ headers: { authorization } }, User) => {
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  return email && await User.findOne({email});
};

module.exports = {
  extractAuthenticationHeader,
};