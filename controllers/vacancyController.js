const Vacancy = require("../models/vacancy");

const BAD_REQUEST = 400;

/* Get all vacancies */
exports.get = async (req, res) => {
  try {
    const userId = req.user._id;
    const vacancies = await Vacancy.find({ userId: userId });
    res.json(vacancies);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Get vacancy by id */
exports.getById = async (req, res) => {
  try {
    const vacancyId = req.params.vacancyId;
    const vacancy = await Vacancy.findById(vacancyId);
    res.json(vacancy);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save vacancy */
exports.save = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const vacancy = new Vacancy({
      userId: userId,
      name: name,
    });
    const doc = await vacancy.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Update vacancy */
exports.update = async (req, res) => {
  try {
    const { _id: vacancyId, name } = req.body;
    const vacancy = await Vacancy.findById(vacancyId);
    vacancy.name = name;
    const doc = await vacancy.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove vacancy */
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
