const express = require("express");
const router = express.Router();

const redirectToIndex = (res) => res.redirect("/index.html");

router.get("/addJob", (req, res) => redirectToIndex(res));
router.get("/job", (req, res) => redirectToIndex(res));

module.exports = router;
