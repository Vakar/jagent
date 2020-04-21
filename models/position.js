const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PositionsSchema = new Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Departments" },
  name: { type: String, required: true, max: 100 },
});

module.exports = mongoose.model("Positions", PositionsSchema);
