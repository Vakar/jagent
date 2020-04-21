const Department = require("../models/department");

/* Get all departments of company */
exports.get = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const query = { companyId: companyId };
    const departments = await Department.find(query);
    res.json(departments);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Get department by id */
exports.getById = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await Department.findById(departmentId);
    res.json(department);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Save department */
exports.save = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { name } = req.body;
    const department = new Department({
      companyId: companyId,
      name: name,
    });
    const doc = await department.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Update department */
exports.update = async (req, res) => {
  try {
    const { _id: departmentId, name } = req.body;
    const department = await Department.findById(departmentId);
    department.name = name;
    const doc = await department.save();
    res.json(doc);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

/* Remove department */
exports.remove = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    await Department.findByIdAndRemove(departmentId);
    res.send("OK");
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
