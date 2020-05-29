const Vacancy = require("../models/vacancy");

/* Get all vacancies by job id */
exports.get = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const vacancies = await Vacancy.find({ jobId: jobId });
    res.json(vacancies);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save vacancy to database */
exports.save = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const body = req.body;
    body.jobId = jobId;
    const vacancy = new Vacancy(body);
    const doc = await vacancy.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove vacancy by id */
exports.remove = async (req, res) => {
  try {
    const vacancyId = req.params.vacancyId;
    await Vacancy.findByIdAndRemove(vacancyId);
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
