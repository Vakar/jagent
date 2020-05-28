const Job = require("./job");
const User = require("./user");

/* Factory method for User mongoose model */
exports.newUser = (username, pswdHash) => {
  return new User({
    username: username,
    password: pswdHash,
  });
};

/* Factory method for Job mongoose model */
exports.newJob = (userId, name) => {
  return new Job({
    userId: userId,
    name: name,
  });
};
