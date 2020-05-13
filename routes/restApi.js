const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const companyController = require("../controllers/companyController");

const jsonParser = bodyParser.json();

/* COMPANIES REST API */

router.get("/companies", companyController.get);
router.get("/companies/:companyId", companyController.getById);
router.post("/companies", jsonParser, companyController.save);
router.put("/companies", companyController.update);
router.delete("/companies/:companyId", companyController.remove);

module.exports = router;
