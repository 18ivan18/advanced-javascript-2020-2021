require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
let db = null;

module.exports.getDb = () => db;

module.exports.connect = function () {
  return MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
    .then(client => {
      console.log(`Connected to database ${process.env.DB_NAME}`);
      db = client.db(process.env.DB_NAME);
      return db;
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
}