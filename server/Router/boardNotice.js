var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/notice", function (req, res, next) {
  res.send("noticeIndex");
});

module.exports = router;
