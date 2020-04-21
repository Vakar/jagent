const express = require("express");
const router = express.Router();

router.get("/companies", (req, res) => res.send("page_mock"));

module.exports = router;
