const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

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
  userController.validateRegistration(),
  userController.createUser
);

module.exports = router;
