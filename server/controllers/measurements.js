/* eslint-disable no-console */
const Plant = require('../models/plant');

/**
 * Handler for posting Measurements.
 */
const postMeasurement = async (req, res) => {
  try {
    const { name, moisture } = req.body;
    const measurement = {};
    measurement.value = moisture;

    await Plant.findOneAndUpdate(
      { name }, { $push: { moisture: measurement } }, { new: true },
    );

    res.staus(200).json(measurement);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

module.exports = {
  postMeasurement,
};
