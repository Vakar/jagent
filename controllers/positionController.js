const Position = require("../models/position");

/* Get all positions of company department */
exports.get = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const query = { departmentId: departmentId };
    const positions = await Position.find(query);
    res.json(positions);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Get position by id */
exports.getById = async (req, res) => {
  try {
    const positionId = req.params.positionId;
    const position = await Position.findById(positionId);
    res.json(position);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save position */
exports.save = async (req, res) => {
  try {
    const departmentId = req.params.companyId;
    const { name } = req.body;
    const position = new Position({
      departmentId: departmentId,
      name: name,
    });
    const doc = await position.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Update position */
exports.update = async (req, res) => {
  try {
    const { _id: positionId, name } = req.body;
    const position = await Position.findById(positionId);
    position.name = name;
    const doc = await position.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove position */
exports.remove = async (req, res) => {
  try {
    const positionId = req.params.positionId;
    await Position.findByIdAndRemove(positionId);
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
