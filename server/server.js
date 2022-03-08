var express = require("express");
var cors = require("cors");

var test = require("./Router/boardNews");
var index = require("./Router/index");

var app = express();
app.use(cors());

app.use("/", test);
app.use("/api", index);

var port = process.env.PORT || 8000;
app.listen(port, () => console.log(`running on port ${port}`));

module.exports = app;
