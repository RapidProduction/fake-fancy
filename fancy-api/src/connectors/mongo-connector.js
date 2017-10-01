const { MongoClient } = require('mongodb');
const { databaseEndpoint } = require('../configs');

module.exports = async () => {
  const db = await MongoClient.connect(databaseEndpoint);
  return {
    Currency: db.collection('currencies'),
    Language: db.collection('languages'),
    TimeZone: db.collection('timeZones'),
    User: db.collection('user'),
  };
};