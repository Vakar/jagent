const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");

/* GET home page. */
router.get("/", (req, res) => res.redirect("/login"));

/* GET registration page */
router.get("/registration", (req, res) =>
  res.render("registration", {
    title: "Registration page",
  })
);

/* POST register user */
router.post(
  "/register",
  registrationController.validateRegistration(),
  registrationController.saveUser
);

module.exports = router;
