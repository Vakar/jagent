const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { docToObj } = require("../utils/mongooseUtil");

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

exports.connect = async () => {
  const connectionState = mongoose.connection.readyState;
  const CONNECTED = 1;
  if (connectionState !== CONNECTED) {
    await openConnection();
  }
};

/**
 * Populate database.
 * Add payload to each object in objects array,
 * save objects to database and return array
 * of saved objects as plain JS objects array.
 *
 * @param objects Array of JS objects.
 * @param model Mongoose model.
 * @param payload Can be JS object or undefined.
 *
 * @return Array of saved JS objects.
 */
exports.populateAll = async (objects, model, payload) => {
  const docs = await Promise.all(
    objects
      .map((obj) => Object.assign(obj, payload))
      .map((obj) => new model(obj))
      .map(async (e) => await e.save())
  );
  return docs.map((doc) => docToObj(doc));
};

/**
 * Populate database with one object.
 * At first method add payload to object,
 * then save object to database and return
 * saved plain JS objects array.
 *
 * @param object JS objects.
 * @param model Mongoose model.
 * @param payload Can be JS object or undefined.
 *
 * @return Saved object as plain JS objects.
 */
exports.populate = async (object, model, payload) => {
  const obj = Object.assign(object, payload);
  const mod = new model(obj);
  const doc = await mod.save();
  return docToObj(doc);
};

/**
 * Drop database, close the connection and stop mongod.
 */
exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
exports.clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
