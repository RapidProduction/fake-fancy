const {
  grapqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');

const schema = require('./schema');

const PORT = 7001;

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`Fake Fancy running on port ${PORT}.`);
});
