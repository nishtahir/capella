import { StatusCodes } from 'http-status-codes';

const notFound = (req, res) => res.status(StatusCodes.NOT_FOUND)
  .json({ error: 'NotFoundError', msg: 'Route does not exist' });

export default notFound;
