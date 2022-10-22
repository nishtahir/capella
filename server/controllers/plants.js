import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import * as Plants from '../models/plant.js';

const { create, find, findOne } = Plants;
/**
 * Handler to create a new plant with the given name.
 */
export const createPlant = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    throw new BadRequestError('Please provide a valid plant name.');
  }
  const plant = await create({ name });

  res.status(StatusCodes.CREATED).json({ plant });
};

/**
 * Handler to get all plants.
 */
export const getAllPlants = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  const plants = await find({}).limit(limit).skip(offset);

  res.status(StatusCodes.OK).json({ limit, offset, data: plants });
};

/**
 * Handler to get a single plant data.
 */
export const getPlant = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  const { name } = req.params;

  if (typeof name !== 'string') {
    throw new BadRequestError('Please provide a valid plant name.');
  }

  const plant = await findOne({ name });
  if (!plant) {
    throw new NotFoundError(`No plant with name ${name}`);
  }

  res.status(StatusCodes.OK).json({ limit, offset, data: plant });
};
