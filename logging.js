const filesize = require("file-size");

const formatFileSize = size => {
  return filesize(size).human();
};

const logBundle = bundle =>
  new Promise(resolve => {
    console.log(`cypress run bundled ${formatFileSize(bundle.size)}`);
    resolve();
  });

const logUpload = (response, uploadTarget) => {
  if (response.statusCode === 200) {
    console.log(`successuflly uploaded bundle to ${uploadTarget}`);
  } else {
    console.warn(
      `Error while uploading to ${uploadTarget}. Status: ${response.statusCode}`
    );
  }
};

module.exports = {
  logBundle,
  logUpload
};
