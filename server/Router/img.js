const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const admin = require("firebase-admin");
const fs = require("fs");
const request = require("request");
const sharp = require("sharp");
const uuid = require("uuid-v4");
// const serviceAccount = require("(json파일의 경로)");

function download(uri, fileName, row, path) {
  return new Promise((resolve) => {
    request.head(uri, function (err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(fileName))
        .on("close", () => {
          sharp(fileName)
            .resize({ height: 400, width: 400 })
            .toFile("output_image", (err, info) => {
              const bucket = admin.storage().bucket();
              async function uploadFile() {
                const metadata = {
                  metadata: {
                    firebaseStorageDownloadTokens: uuid(),
                  },
                  contentType: "image/jpeg",
                  cacheControl: "no-cache",
                };
                // 옵션으로 경로 설정
                await bucket.upload("output_image", {
                  gzip: true,
                  metadata: metadata,
                  destination:
                    "(저장하고자 하는 경로)/" + fileName.split("@")[1],
                });
                console.log(`${row.postIdx} ${row.imageOrder} uploaded.`);
              }
              uploadFile().catch(console.error);
            });
          resolve("success");
        });
    });
  });
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://(버킷 이름).appspot.com",
});

exports.uploadThumbnail = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await connection.query(
        `
                    SELECT postIdx, imageOrder, imageUrl
                    FROM PostImage 
                        ORDER BY postIdx ASC, imageOrder ASC 
                    ;`
      );
      connection.release();
      uploadImage(rows);
      return res.json(rows);
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      connection.release();
      return false;
    }
  } catch (err) {
    logger.error(
      `example non transaction DB Connection error\n: ${JSON.stringify(err)}`
    );
    return false;
  }
};

async function uploadImage(rows, page) {
  for (const row of rows) {
    if (
      row.imageUrl == null ||
      row.imageUrl == "" ||
      row.imageUrl.length == 0
    ) {
      continue;
    }
    let path = row.imageUrl.split("?")[0].split("%2F");
    let fileName = path.pop();
    if (fileName.indexOf(".") === -1) {
      fileName = path[2] + "@" + fileName + "_400x400";
    } else {
      fileName = fileName.split(".");
      fileName = path[2] + "@" + fileName[0] + "_400x400." + fileName[1];
    }
    await download(row.imageUrl, fileName, row, path);
  }
  console.log(`finished`);
}
