/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = require('./models');

const { sequelize } = db;
const Measurement = db.measurement;
const Plant = db.plant;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

async function createTables() {
  try {
    await Measurement.sync();
    await Plant.sync();
  } catch (err) {
    console.error('Unable to create tables', err);
  }
}

async function connectToDatabase() {
  await testConnection();
  await createTables();
}

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/plants/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const results = await Plant.findAll({
      distinct: 'plant_name',
    });

    res.json({ limit, offset, data: results });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

app.get('/plants/:name', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const name = req.params.name.trim();
    const plant = await Plant.findOne({
      where: { name },
    });
    const results = await plant.getMeasurements({
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.json({ limit, offset, data: results });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

app.post('/plants', async (req, res) => {
  try {
    const name = req.body.name.trim();
    const plant = await Plant.create({ name });
    res.json(plant);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

app.post('/measurements', async (req, res) => {
  try {
    const name = req.body.name.trim();
    const { moisture } = req.body;

    const plant = await Plant.findOne({ where: { name } });
    const measurement = await plant.createMeasurement({
      moisture,
    });
    res.json(measurement);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

async function startApp() {
  try {
    await connectToDatabase();
    app.listen(port, () => console.log(`Listening on port ${port}!`));
  } catch (e) {
    console.error('Unable to start server: ', e);
  }
}

startApp();
