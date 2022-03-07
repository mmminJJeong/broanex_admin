const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const PORT = process.env.port || 8000;
const cors = require("cors");

const db = mysql.createPool({
  host: "broanex-test.ctujfjmdd0pi.ap-northeast-2.rds.amazonaws.com",
  user: "minjeong",
  password: "asd1346520",
  database: "simple",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.test;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/insert", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.test (title, content) VALUES (?,?)";
  db.query(sqlQuery, (err, result) => {
    res.send("success!");
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
