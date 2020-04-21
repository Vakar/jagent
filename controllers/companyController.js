const Company = require("../models/company");

const BAD_REQUEST = 400;

/* Get all companies */
exports.get = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Get company by id */
exports.getById = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    res.json(company);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save company */
exports.save = async (req, res) => {
  try {
    // const userId = req.user._id; //! For test purpose
    const { userId, name } = req.body;
    const company = new Company({
      userId: userId,
      name: name,
    });
    const doc = await company.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Update company */
exports.update = async (req, res) => {
  try {
    const { _id: companyId, name } = req.body;
    const company = await Company.findById(companyId);
    company.name = name;
    const doc = await company.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove company */
exports.remove = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    await Company.findByIdAndRemove(companyId);
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
