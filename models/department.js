const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartmentsSchema = new Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
  name: { type: String, required: true, max: 100 },
});

module.exports = mongoose.model("Departments", DepartmentsSchema);
