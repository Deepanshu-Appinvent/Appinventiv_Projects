const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const Error = require('../middleware/errorHandler');

router.get('/add/:num1/:num2', Error, calculatorController.add);
router.get('/sub/:num1/:num2', Error, calculatorController.sub);
router.get('/mul/:num1/:num2', Error, calculatorController.mul);
router.get('/div/:num1/:num2', Error, calculatorController.div);

module.exports = router;
