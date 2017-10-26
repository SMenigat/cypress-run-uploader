const spawn = require("child_process").spawnSync;

const getStdoutString = process => process.stdout.toString().trim();

const getCurrentCommitInfo = () => {
  const gitBranch = spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  const gitCommitInfo = spawn("git", [
    "log",
    "--format=%H%n%an%n%ae%n%at%n%s",
    "-n",
    "1"
  ]);
  const branchName = getStdoutString(gitBranch);
  const [hash, authorName, authorEmail, authorDate, subject] = getStdoutString(
    gitCommitInfo
  ).split("\n");
  return {
    branchName,
    hash,
    authorName,
    authorEmail,
    authorDate,
    subject
  };
};

module.exports = {
  getCurrentCommitInfo
};
