/* eslint-disable no-console */
const Plant = require('../models/plant');

/**
 * Route to create a new plant with the given name.
 */
const createPlant = async (req, res) => {
  try {
    const name = req.body.name.trim();
    const plant = await Plant.create({ name });
    res.json(plant);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

module.exports = {
  createPlant,
};
