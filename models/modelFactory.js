const Vacancy = require("./vacancy");
const User = require("./user");

/* Factory method for User mongoose model */
exports.newUser = (username, pswdHash) => {
  return new User({
    username: username,
    password: pswdHash,
  });
};

/* Factory method for Vacancy mongoose model */
exports.newVacancy = (userId, name) => {
  return new Vacancy({
    userId: userId,
    name: name,
  });
};
