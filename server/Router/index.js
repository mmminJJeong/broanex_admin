const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const cors = require("cors");

const db = mysql.createPool({
  host: "broanex-test.ctujfjmdd0pi.ap-northeast-2.rds.amazonaws.com",
  user: "minjeong",
  password: "asd134652",
  database: "sample",
  port: "3310",
  connectionLimit: 66,
  waitForConnections: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split;
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use([
  express.static("public"),
  express.json(),
  cors(corsOptions),
  upload.array("files"),
]);

router.post("/upload_files", (req, res) => {
  // console.log(req.body);
  if (req.files.length > 0) {
    res.json(req.files[0]);
  }
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//글리스트 불러오는 주소
router.get("/getNewsList", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.news;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//저장하는 주소
router.post("/saveNews", (req, res) => {
  const creator_id = req.body.creator_id;
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  const image = req.body.image;
  const sqlQuery =
    "INSERT INTO sample.news (creator_id, title, content, date, image) VALUES (?,?,?,?,?)";
  db.query(
    sqlQuery,
    [creator_id, title, content, date, image],
    (err, result) => {
      res.send(err);
    }
  );
});

// 글 불러오기
router.get("/getNewsPost", (req, res) => {
  const sqlQuery = "SELECT * FROM sample.news;";
  connection.query(sqlQuery, (err, row) => {
    if (err) {
      console.error(err);
    } else {
      res.render("getNewsPost", { title: "글 조회", rows: row });
    }
  });
});

module.exports = router;
