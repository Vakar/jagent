const Job = require("./job");
const User = require("./user");

/**
 * Factory method for User mongoose model.
 *
 * @param {string} User name.
 * @param {string} User password hash.
 *
 * @return {User} Return mongoose model.
 */
exports.newUser = (username, pswdHash) => {
  return new User({
    username: username,
    password: pswdHash,
  });
};

/**
 * Factory method for Job mongoose model.
 *
 * @param {string} userId Mongodb object id.
 * @param {string} name Job name.
 *
 * @return {Job} Return mongoose model.
 */
exports.newJob = (userId, name) => {
  return new Job({
    userId: userId,
    name: name,
  });
};
