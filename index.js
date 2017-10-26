const {
  bundleTempPath,
  bundleCypressRun,
  removeLocalBundle,
  getFileSize
} = require("./bundler");

// the actual arguments start at pos 3 of argv
const args = process.argv.slice(2);

// path to cypress directory is passed in as arg
const cypressPath = `${process.cwd()}/${args[0]}`;

bundleCypressRun(cypressPath)
  .then(() => console.log(`cypress run bundled ${getFileSize()}`))
  .then(removeLocalBundle);
