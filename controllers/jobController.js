const Job = require("../models/job");
const { BAD_REQUEST } = require("../constants/httpCodes");

/* Get all jobs */
exports.get = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ userId: userId });
    res.json(jobs);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Get job by id */
exports.getById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    res.json(job);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save job */
exports.save = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const job = new Job({
      userId: userId,
      name: name,
    });
    const doc = await job.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Update job */
exports.update = async (req, res) => {
  try {
    const { _id: jobId, name } = req.body;
    const job = await Job.findById(jobId);
    job.name = name;
    const doc = await job.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove job */
exports.remove = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    await Job.findByIdAndRemove(jobId);
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
