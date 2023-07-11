const fs = require("fs");
const path = require("path");

function mergeFiles(files) {
  return new Promise((resolve, reject) => {
    const mergedFileName = `test_${Date.now()}.txt`;
    const mergedFilePath = path.join(__dirname, "../../backup", mergedFileName);
    let mergedData = "";

    files.forEach((file) => {
      const filePath = path.join(__dirname, "../../upload", file);
      const fileData = fs.readFileSync(filePath, "utf8");
      mergedData += fileData;
    });

    fs.writeFile(mergedFilePath, mergedData, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(mergedFileName);
      }
    });
  });
}

module.exports = {
  mergeFiles,
};
