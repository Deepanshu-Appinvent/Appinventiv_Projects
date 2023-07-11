const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadService = require('../services/uploadService');

const storage = multer.diskStorage({
  destination: './upload',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.any('file'), (req, res) => {
  uploadService.uploadFile(req.file)
    .then(() => {
      res.json({ message: 'File uploaded successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'File uploaded ailedf' });
    });
});

module.exports = router;
