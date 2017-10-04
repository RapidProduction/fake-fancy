const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const uuid = require('node-uuid');

const {
  connectMongoDb,
  mongoId,
} = require('./src/connectors/mongo-connector');
const setupPassportStrategies = require('./src/configs/passport');
const { authenticate } = require('./src/libs/authentication');
const formatError = require('./src/libs/error-formatter');
const schema = require('./src/schema');

const mongo = require('mongodb');

const startServer = async () => {
  const PORT = 7001;
  const corsOptions = {
    origin: 'http://localhost:7002',
    credentials: true,
  };

  const mongoConnector = await connectMongoDb();
  const builtOptions = async (request) => {
    // TODO: This should find by Id not email, we assume email is unique
    let user = undefined;
    if(request.user) {
      user = await mongoConnector.User.findOne({ _id: mongoId(request.user.id) });
    }
    return {
      context: { mongoConnector, user, request },
      formatError,
      schema,
    };
  };
  setupPassportStrategies(mongoConnector.User);

  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(authenticate);
  app.use('/graphql', bodyParser.json(), graphqlExpress(builtOptions));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.listen(PORT, () => console.log(`Fake Fancy API running on port ${PORT}.`));
};

startServer();