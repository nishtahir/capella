/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const plantsRouter = require('./routes/plants');

app.use(express.json());

// Attach routes
app.use('/api/v1/plants', plantsRouter);

// app.get('/plants/', async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const offset = parseInt(req.query.offset, 10) || 0;

//     const results = await Plant.findAll({
//       distinct: 'plant_name',
//     });

//     res.json({ limit, offset, data: results });
//   } catch (e) {
//     console.error(e);
//     res.send(e);
//   }
// });

// app.get('/plants/:name', async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const offset = parseInt(req.query.offset, 10) || 0;

//     const name = req.params.name.trim();
//     const plant = await Plant.findOne({
//       where: { name },
//     });
//     const results = await plant.getMeasurements({
//       order: [['createdAt', 'DESC']],
//       limit,
//       offset,
//     });

//     res.json({ limit, offset, data: results });
//   } catch (e) {
//     console.error(e);
//     res.send(e);
//   }
// });

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
