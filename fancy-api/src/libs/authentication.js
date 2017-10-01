const authenticated = (user) => {
  if (!user) {
    throw new Error('Unauthenticated');
  }
};

module.exports = {
  authenticated,
};