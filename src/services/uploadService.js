const fs = require('fs');

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file uploaded'));
    }

    const filePath = `../../upload/${file.originalname}`;

    fs.copyFile(file.path, filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  uploadFile
};
