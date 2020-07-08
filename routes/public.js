const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");

const RECAPTCHA_SITE_KEY = process.env.JAGENT_RECAPTCHA_SITE_KEY;

/* GET home page. */
router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/index.html");
  } else {
    res.redirect("/login");
  }
});

/* GET registration page */
router.get("/registration", (req, res) =>
  res.render("registration", {
    title: "Registration page",
    recaptchaSiteKey: RECAPTCHA_SITE_KEY,
  })
);

/* POST register user */
router.post(
  "/register",
  registrationController.validateRegistration(),
  registrationController.saveUser
);

module.exports = router;
