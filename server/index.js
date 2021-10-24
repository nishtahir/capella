/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const plantsRouter = require('./routes/plants');
const measurementsRouter = require('./routes/measurements');

app.use(express.json());

// Attach routes
app.use('/api/v1/plants', plantsRouter);
app.use('/api/v1/measurements', measurementsRouter);

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
