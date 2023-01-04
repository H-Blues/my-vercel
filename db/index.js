const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(process.env.MONGO_DB, {
    native_parser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      let db = client.db("movies");
      cachedDb = db;
      return cachedDb;
    })
    .catch((error) => {
      console.log("Mongo connect Error");
      console.log(error);
    });
};