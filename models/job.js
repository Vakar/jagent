const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  name: { type: String, required: true, max: 100 },
});

module.exports = mongoose.model("Jobs", JobsSchema);
