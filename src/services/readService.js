const fs = require('fs');
const path = require('path');

function readFile() {
  return new Promise((resolve, reject) => {
    const backupFolderPath = path.join(__dirname,'../../backup');

    fs.readdir(backupFolderPath, (error, files) => {
      if (error || files.length === 0) {
        reject(new Error('No file found'));
      } else {
        const fileName = files[0];
        const filePath = path.join(backupFolderPath, fileName);

        fs.readFile(filePath, 'utf8', (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      }
    });
  });
}

module.exports = {
  readFile
};
