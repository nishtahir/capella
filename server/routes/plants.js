const express = require('express');

const router = express.Router();

const { createPlant, getAllPlants, getPlant } = require('../controllers/plants');

router.route('/').post(createPlant).get(getAllPlants);
router.route('/:name').get(getPlant);

module.exports = router;
