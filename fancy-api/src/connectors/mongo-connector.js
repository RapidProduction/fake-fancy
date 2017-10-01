const { MongoClient, ObjectID } = require('mongodb');
const { databaseEndpoint } = require('../configs');

const connectMongoDb = async () => {
  const db = await MongoClient.connect(databaseEndpoint);
  return {
    Currency: db.collection('currencies'),
    Language: db.collection('languages'),
    TimeZone: db.collection('timeZones'),
    User: db.collection('user'),
  };
};

const mongoId = (id) => new ObjectID(id);

module.exports = {
  connectMongoDb,
  mongoId,
}