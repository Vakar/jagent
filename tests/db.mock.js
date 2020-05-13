const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

/**
 * Connect to the in-memory database.
 */
const openConnection = async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, mongooseOpts);
};

module.exports.connect = async () => {
  const connectionState = mongoose.connection.readyState;
  const CONNECTED = 1;
  if (connectionState !== CONNECTED) {
    await openConnection();
  }
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
