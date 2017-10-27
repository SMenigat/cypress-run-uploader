const fs = require("fs");
const restler = require("restler");

const upload = (file, target) => {
  return new Promise(resolve => {
    fs.stat(file, (err, stats) => {
      restler
        .post(target, {
          multipart: true,
          data: {
            "cypress-run": restler.file(
              file,
              null,
              stats.size,
              null,
              "application/x-tar"
            )
          }
        })
        .on("complete", (data, response) => {
          resolve(response);
        });
    });
  });
};

module.exports = {
  upload
};

//upload("/Users/smenigat/Desktop/run.tar", "http://localhost:1337/upload");
