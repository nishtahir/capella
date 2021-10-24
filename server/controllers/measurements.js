const { StatusCodes } = require('http-status-codes');
const Plant = require('../models/plant');
const { BadRequestError, NotFoundError } = require('../errors');

/**
 * Handler for posting Measurements.
 */
const postMeasurement = async (req, res) => {
  const { name, moisture } = req.body;

  if (typeof name !== 'string') {
    throw new BadRequestError('Please provide a valid plant name.');
  }
  if (typeof moisture !== 'number') {
    throw new BadRequestError('Please provide a valid moisture value.');
  }
  const measurement = {};
  measurement.value = moisture;

  const plant = await Plant.findOneAndUpdate(
    { name }, { $push: { moisture: measurement } }, { new: true },
  );

  if (!plant) {
    throw new NotFoundError(`No plant with name ${name} found.`);
  }
  const lastestMoisture = plant.moisture.pop();
  res.status(StatusCodes.OK).json({ moisture: lastestMoisture });
};

module.exports = {
  postMeasurement,
};
