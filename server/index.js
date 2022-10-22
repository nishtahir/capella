/* eslint-disable no-console */
import 'express-async-errors';
import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import plantsRouter from './routes/plants.js';
import measurementsRouter from './routes/measurements.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();
const app = express();

app.use(json());

// Attach routes
app.use('/api/v1/plants', plantsRouter);
app.use('/api/v1/measurements', measurementsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

/**
 * Connect to DB and listen for connections
 */
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
