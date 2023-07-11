const express = require('express');
const router = express.Router();
const mergeService = require('../services/mergeService');

router.post('/', (req, res) => {
  const files = req.body.files;

  mergeService.mergeFiles(files)
    .then(mergedFileName => {
      res.json({ message: 'Files merged successfully', mergedFileName });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to merge the files' });
    });
});

module.exports = router;
