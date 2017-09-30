const { MongoClient } = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017/fancy';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
    Currency: db.collection('currencies'),
    Language: db.collection('languages'),
    TimeZone: db.collection('timeZones'),
    User: db.collection('user'),
  };
};