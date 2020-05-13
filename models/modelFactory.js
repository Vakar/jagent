const Vacancy = require("./vacancy");
const User = require("./user");

/* Factory method for User mongoose model */
module.exports.newUser = (username, pswdHash) => {
  return new User({
    username: username,
    password: pswdHash,
  });
};

/* Factory method for Vacancy mongoose model */
module.exports.newVacancy = (userId, name) => {
  return new Vacancy({
    userId: userId,
    name: name,
  });
};
