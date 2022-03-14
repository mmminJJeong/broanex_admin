const multer = require("multer");
const path = require("path");
const app = express();
const cors = require("cors");

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

app.post("/upload_files", (req, res) => {
  // console.log(req.body);
  if (req.files.length > 0) {
    res.json(req.files[0]);
  }
});
