const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const db = mysql.createPool({
  host: "broanex-test.ctujfjmdd0pi.ap-northeast-2.rds.amazonaws.com",
  user: "minjeong",
  password: "asd134652",
  database: "sample",
  port: "3310",
  connectionLimit: 66,
  waitForConnections: true,
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/getNoticeList", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.notice;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

router.post("/saveNotice", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const sqlQuery = "INSERT INTO sample.notice (title, content) VALUES (?,?)";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(err);
  });
});

module.exports = router;
