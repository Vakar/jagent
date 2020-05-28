const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MAX_STRING_FIELD_LENGTH = 256;

const SearchParamsSchema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" },
  country: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
  cityName: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
  keyWords: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
});

module.exports = mongoose.model("SearchParams", SearchParamsSchema);
