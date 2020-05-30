const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jobController = require("../controllers/jobController");
const userController = require("../controllers/userController");
const vacancyController = require("../controllers/vacancyController");
const searchParamsController = require("../controllers/searchParamsController");

const jsonParser = bodyParser.json();

/* REST API */

/* -> JOBS */
router.get("/jobs", jobController.get);
router.get("/jobs/:jobId", jobController.getById);
router.post("/jobs", jsonParser, jobController.save);
router.put("/jobs", jobController.update);
router.delete("/jobs/:jobId", jobController.remove);

/* -> USER */
router.get("/user/id", userController.getId);

/* -> VACANCIES */
router.get("/jobs/:jobId/vacancies", vacancyController.get);
router.post("/jobs/:jobId/vacancies", jsonParser, vacancyController.save);
router.delete("/jobs/:jobId/vacancies/:vacancyId", vacancyController.remove);

/* -> JOB SEARCH PARAMETERS */
router.get("/jobs/:jobId/searchParams", searchParamsController.getByJobId);
router.post(
  "/jobs/:jobId/searchParams",
  jsonParser,
  searchParamsController.save
);
router.delete("/jobs/:jobId/searchParams", searchParamsController.remove);

module.exports = router;
