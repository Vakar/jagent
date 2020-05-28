const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MAX_STRING_FIELD_LENGTH = 256;
const MAX_SHORT_DESCRIPTION_LENGTH = 512;
const MIN_VACANCY_DATE = "2020-01-01";

const VacanciesSchema = new Schema({
  vacancyId: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
  name: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
  date: { type: Date, required: true, min: MIN_VACANCY_DATE },
  companyName: { type: String, required: true, max: MAX_STRING_FIELD_LENGTH },
  shortDescription: {
    type: String,
    required: true,
    max: MAX_SHORT_DESCRIPTION_LENGTH,
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" },
});

module.exports = mongoose.model("Vacancies", VacanciesSchema);
