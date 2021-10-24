const express = require('express');

const router = express.Router();

const { createPlant } = require('../controllers/plants');

router.route('/').post(createPlant);

module.exports = router;
