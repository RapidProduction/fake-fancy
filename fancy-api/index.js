const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');

const connectMongoDb = require('./src/connectors/mongo-connector');
const schema = require('./src/schema');

const startServer = async () => {
  const mongoConnector = await connectMongoDb();

  const PORT = 7001;
  const app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongoConnector },
    schema,
  }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.listen(PORT, () => {
    console.log(`Fake Fancy running on port ${PORT}.`);
  });
};

startServer();