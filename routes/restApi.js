const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const companyController = require("../controllers/companyController");
const departmentController = require("../controllers/departmentController");
const positionController = require("../controllers/positionController");

const jsonParser = bodyParser.json();

/* COMPANIES REST API */

router.get("/companies", companyController.get);
router.get("/companies/:companyId", companyController.getById);
router.post("/companies", jsonParser, companyController.save);
router.put("/companies", companyController.update);
router.delete("/companies/:companyId", companyController.remove);

/* DEPARTMENTS REST API */

router.get("/companies/:companyId/departments", departmentController.get);
router.get(
  "/companies/:companyId/departments/:departmentId",
  departmentController.getById
);
router.post("/companies/:companyId/departments", departmentController.save);
router.put("/companies/:companyId/departments", departmentController.update);
router.delete(
  "/companies/:companyId/departments/:departmentId",
  departmentController.remove
);

/* POSITIONS REST API */

router.get(
  "/companies/:companyId/departments/:departmentId/positions",
  positionController.get
);
router.get(
  "/companies/:companyId/departments/:departmentId/positions/:positionId",
  positionController.getById
);
router.post(
  "/companies/:companyId/departments/:departmentId/positions",
  positionController.save
);
router.put(
  "/companies/:companyId/departments/:departmentId/positions",
  positionController.update
);
router.delete(
  "/companies/:companyId/departments/:departmentId/positions/:positionId",
  positionController.remove
);

module.exports = router;
