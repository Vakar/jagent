const express = require("express"),
  router = express.Router();

/* GET private page */
router.get("/private", (req, res) => {
  res.render("private", { user: req.user.username });
});

module.exports = router;
