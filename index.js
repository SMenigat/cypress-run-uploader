const {
  bundleTempPath,
  bundleCypressRun,
  removeLocalBundle
} = require("./bundler");
const { upload } = require("./uploader");
const { logBundle, logUpload } = require("./logging");

// the actual arguments start at pos 3 of argv
const args = process.argv.slice(2);

// path to cypress directory is passed in as arg
const cypressPath = `${process.cwd()}/${args[0]}`;
const uploadTarget = args[1];

bundleCypressRun(cypressPath)
  .then(bundle => logBundle(bundle))
  .then(() => upload(bundleTempPath, uploadTarget))
  .then(response => logUpload(response, uploadTarget))
  .then(removeLocalBundle);
