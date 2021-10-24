const express = require('express');

const router = express.Router();

const { postMeasurement } = require('../controllers/measurements');

router.route('/').post(postMeasurement);

module.exports = router;
