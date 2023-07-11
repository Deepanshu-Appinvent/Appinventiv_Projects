const express = require('express');
const router = express.Router();
const readService = require('../services/readService');

router.get('/', (req, res) => {
  readService.readFile()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to read the file' });
    });
});

module.exports = router;
