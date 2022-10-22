import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import * as Plants from '../models/plant.js';

const { findOneAndUpdate } = Plants;

/**
 * Handler for posting Measurements.
 */
export const postMeasurement = async (req, res) => {
  const { name, moisture } = req.body;

  if (typeof name !== 'string') {
    throw new BadRequestError('Please provide a valid plant name.');
  }
  if (typeof moisture !== 'number') {
    throw new BadRequestError('Please provide a valid moisture value.');
  }
  const data = {};
  data.value = moisture;

  const plant = await findOneAndUpdate({ name }, { $push: { moisture: data } }, { new: true });

  if (!plant) {
    throw new NotFoundError(`No plant with name ${name} found.`);
  }
  const lastestMoisture = plant.moisture.pop();
  res.status(StatusCodes.OK).json({ moisture: lastestMoisture });
};
