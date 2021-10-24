/* eslint-disable no-console */
const Plant = require('../models/plant');

/**
 * Route to create a new plant with the given name.
 */
const createPlant = async (req, res) => {
  try {
    const name = req.body.name.trim();
    const plant = await Plant.create({ name });
    res.status(201).json({ plant });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

/**
 * Route to get all plants.
 */
const getAllPlants = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const plants = await Plant.find({}).limit(limit).skip(offset);

    res.status(200).json({ limit, offset, data: plants });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

/**
 * Route to get a single plant data.
 */
const getPlant = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const name = req.params.name.trim();
    // eslint-disable-next-line no-unused-vars
    const plant = await Plant.findOne({ name });
    const measurements = [];

    res.status(200).json({ limit, offset, data: measurements });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

module.exports = {
  createPlant,
  getAllPlants,
  getPlant,
};
