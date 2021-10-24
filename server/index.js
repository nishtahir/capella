/* eslint-disable no-console */
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const plantsRouter = require('./routes/plants');
const measurementsRouter = require('./routes/measurements');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.json());

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
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
