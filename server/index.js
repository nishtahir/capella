/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const plantsRouter = require('./routes/plants');

app.use(express.json());

// Attach routes
app.use('/api/v1/plants', plantsRouter);

// app.post('/measurements', async (req, res) => {
//   try {
//     const name = req.body.name.trim();
//     const { moisture } = req.body;

//     const plant = await Plant.findOne({ where: { name } });
//     const measurement = await plant.createMeasurement({
//       moisture,
//     });
//     res.json(measurement);
//   } catch (e) {
//     console.error(e);
//     res.send(e);
//   }
// });
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
