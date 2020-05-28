const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jobController = require("../controllers/jobController");
const userController = require("../controllers/userController");

const jsonParser = bodyParser.json();

/* jobs REST API */

router.get("/jobs", jobController.get);
router.get("/jobs/:jobId", jobController.getById);
router.post("/jobs", jsonParser, jobController.save);
router.put("/jobs", jobController.update);
router.delete("/jobs/:jobId", jobController.remove);

/* user REST API */
router.get("/user/id", userController.getId);

module.exports = router;
