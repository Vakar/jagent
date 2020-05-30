const { BAD_REQUEST } = require("../constants/httpCodes");

exports.getId = (req, res) => {
  try {
    res.json({ id: req.user._id });
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
