const SearchParams = require("../models/searchParams");
const { BAD_REQUEST } = require("../constants/httpCodes");

/* Get search params by job id*/
exports.getByJobId = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const searchParams = await SearchParams.findOne({ jobId: jobId });
    res.json(searchParams);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save search params */
exports.save = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    await SearchParams.findOneAndRemove({ jobId: jobId });
    const body = req.body;
    body.jobId = jobId;
    const params = new SearchParams(body);
    const doc = await params.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove search params */
exports.remove = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    await SearchParams.findOneAndRemove({ jobId: jobId });
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
