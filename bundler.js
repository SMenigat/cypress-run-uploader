const fs = require("fs");
const filesize = require("file-size");
const archiver = require("archiver");
const osTmpdir = require("os-tmpdir");
const { getCurrentCommitInfo } = require("./git.js");

const bundleTempPath = `${osTmpdir()}/${Date.now()}-cypress-run.zip`;

const bundleCypressRun = cypressPath => {
  // determine all important paths
  const videoPath = `${cypressPath}/videos/`;
  const screenshotPath = `${cypressPath}/screenshots/`;

  // this outlines the shape of the run.json object
  // that is going to be supplied in the zip later on
  const runInfo = {
    gitCommit: {
      branchName: "",
      hash: "",
      authorName: "",
      authorEmail: "",
      authorDate: "",
      subject: ""
    },
    video: "",
    screenshots: []
  };

  // fill info object with screenshots
  fs.readdirSync(screenshotPath).forEach(file => {
    runInfo.screenshots.push(file);
  });

  // add video to info object
  fs.readdirSync(videoPath).forEach(file => {
    runInfo.video = file;
  });

  // assemble git-commit info object from collected infos
  runInfo.gitCommit = getCurrentCommitInfo();

  // create a file to stream archive data to.
  const output = fs.createWriteStream(bundleTempPath);
  const archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });

  // connect archive to output stream
  archive.pipe(output);

  // add run info as json to our zip
  archive.append(JSON.stringify(runInfo, null, 2), { name: "run.json" });

  // add screenshots to zip
  runInfo.screenshots.forEach(screenshot =>
    archive.append(fs.createReadStream(`${screenshotPath}${screenshot}`), {
      name: `screenshots/${screenshot}`
    })
  );

  // add video to zip
  archive.append(fs.createReadStream(`${videoPath}${runInfo.video}`), {
    name: runInfo.video
  });

  // build archive
  return archive.finalize();
};

const removeLocalBundle = () => {
  fs.unlinkSync(bundleTempPath);
};

const getFileSize = () => {
  return filesize(fs.statSync(bundleTempPath).size).human();
};

module.exports = {
  bundleTempPath,
  bundleCypressRun,
  removeLocalBundle,
  getFileSize
};
