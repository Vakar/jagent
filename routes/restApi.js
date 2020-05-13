const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const vacancyController = require("../controllers/vacancyController");

const jsonParser = bodyParser.json();

/* vacancies REST API */

router.get("/vacancies", vacancyController.get);
router.get("/vacancies/:vacancyId", vacancyController.getById);
router.post("/vacancies", jsonParser, vacancyController.save);
router.put("/vacancies", vacancyController.update);
router.delete("/vacancies/:vacancyId", vacancyController.remove);

module.exports = router;
