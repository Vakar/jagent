const mongoose = require("mongoose");
const Vacancy = require("./vacancy");
const SearchParams = require("./searchParams");

const Schema = mongoose.Schema;

const JobsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  name: { type: String, required: true, max: 100 },
});

JobsSchema.pre("deleteOne", function (next) {
  const id = this.getQuery()["_id"];
  const callback = (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  };
  Vacancy.deleteMany({ jobId: id }, callback);
  SearchParams.deleteMany({ jobId: id }, callback);
});

module.exports = mongoose.model("Jobs", JobsSchema);
