const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const uuid = require('node-uuid');

const connectMongoDb = require('./src/connectors/mongo-connector');
const setupPassportStrategies = require('./src/configs/passport');
const { extractAuthenticationHeader } = require('./src/libs/authentication');
const formatError = require('./src/libs/error-formatter');
const schema = require('./src/schema');

const startServer = async () => {
  const PORT = 7001;
  const app = express();
  const mongoConnector = await connectMongoDb();
  const builtOptions = async (request, response) => {
    return {
      context: { mongoConnector, request, response },
      formatError,
      schema,
    };
  };
  setupPassportStrategies(mongoConnector.User);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    saveUninitialized: true,
    secret: 'mySecretHash',
    resave: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/graphql', bodyParser.json(), graphqlExpress(builtOptions));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.listen(PORT, () => {
    console.log(`Fake Fancy API running on port ${PORT}.`);
  });
};

startServer();