var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/news", function (req, res, next) {
  res.send("index");
});

module.exports = router;
