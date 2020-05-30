const mongoose = require("mongoose");
const Job = require("./job");

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

UsersSchema.pre("deleteOne", function (next) {
  const id = this.getQuery()["_id"];
  const callback = (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  };
  Job.deleteMany({ userId: id }, callback);
});

module.exports = mongoose.model("Users", UsersSchema);
