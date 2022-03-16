const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const multer = require("multer");
const path = require("path");

const db = mysql.createPool({
  host: "211.214.247.21",
  user: "broanexdev",
  password: "broanexdev2020!",
  database: "broanex_board",
  port: "3306",
  connectionLimit: 66,
  waitForConnections: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, "image/");
    } catch (error) {
      console.log("error : " + error);
    }
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const upload = multer({
  storage: storage,
}).single("file");

//이미지 저장
router.post("/upload_img_files", (req, res, next) => {
  upload(req, res, function (err) {
    console.log("req.file : " + req);
    if (err instanceof multer.MulterError) {
      //   console.log(1);
      //   return next(err);
      // } else if (err) {
      //   console.log(2);
      //   return next(err);
    }
    console.log(`원본 파일명 : ${req.file.originalname}`);
    console.log(`저장 파일명 : ${req.file.filename}`);
    console.log(`크기 : ${req.file.size}`);
    return res.json(req.file);
  });
});

//글 리스트 불러오기
router.get("/getNoticeList", (req, res) => {
  const sqlQuery = "SELECT * FROM broanex_board.notice;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//글 작성 저장
router.post("/saveNotice", (req, res) => {
  const creator_id = req.body.creator_id;
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  const image = req.body.image;
  const sqlQuery =
    "INSERT INTO broanex_board.notice (creator_id, title, content, date, image) VALUES (?,?,?,?,?)";
  db.query(
    sqlQuery,
    [creator_id, title, content, date, image],
    (err, result) => {
      res.send(err);
    }
  );
});

//작성한 페이지 불러오기
router.get("/getNoticePost", (req, res) => {
  // sql query 문
  const sql = "SELECT * FROM broanex_board.notice WHERE board_id = ?";
  // 전달받은 parameter 값
  const params = req.query.board_id;
  db.query(sql, params, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
