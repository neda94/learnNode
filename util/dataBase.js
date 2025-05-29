const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

//const connectionURl = "mongodb://127.0.0.1:27017";
const connectionURl = "mongodb://mongo:27017";

const dbName = "onlineShop";

let dbSet;

const mongodbConnect = (cb) => {
  MongoClient.connect(connectionURl)
    .then((client) => {
      console.log("connected!");
      dbSet = client.db(dbName);
      cb(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (dbSet) {
    return dbSet;
  } else {
    throw "no dataBase Found";
  }
};

exports.mongodbConnect = mongodbConnect;
exports.getDB = getDB;
