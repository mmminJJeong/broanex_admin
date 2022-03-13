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

//불러오는 주소
router.get("/getNewsList", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.news;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//저장하는 주소
router.post("/saveNews", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const sqlQuery =
    "INSERT INTO sample.news (title, content, date) VALUES (?,?,?)"; //저정하는 느낌으로 추가했는데 안됨...
  db.query(sqlQuery, [title, content, date], (err, result) => {
    res.send(err);
  });
});

module.exports = router;
