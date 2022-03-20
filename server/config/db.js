const mysql = require("mysql");

const db = mysql.createPool({
  host: "211.214.247.21",
  user: "broanexdev",
  password: "broanexdev2020!",
  database: "broanex_board",
  port: "3306",
  connectionLimit: 66,
  waitForConnections: true,
});

module.exports = db;
