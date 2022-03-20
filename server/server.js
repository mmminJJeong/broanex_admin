const express = require("express");
const cors = require("cors");
const app = express();
const news = require("./Router/boardNews");
const index = require("./Router/index");
const notice = require("./Router/boardNotice");
const noticeIndex = require("./Router/noticeIndex");
const user_inform = require("./Router/user_inform");

app.use(cors());

app.use("/", news);
app.use("/news", index);
app.use("/image", express.static("./image"));
app.use("/api/notice", notice);
app.use("/notice", noticeIndex);
app.use("/upload_files", index);
app.use("/upload_img_files", noticeIndex);

// 로그인
app.use("/user_inform", user_inform);

var port = process.env.PORT || 8000;
app.listen(port, () => console.log(`${port}`));

module.exports = app;
