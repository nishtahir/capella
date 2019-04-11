const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = require('./models');
const sequelize = db.sequelize;
const Measurement = db.measurement;
const Plant = db.plant;

async function connectToDatabase() {
    await testConnection();
    await createTables();
}

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

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/plants/', async (req, res) => {
    try {
        let results = await Plant.findAll({
            distinct: 'plant_name'
        });
        let prettyJson = JSON.stringify(results, null, 4);

        res.type('json');
        res.send(prettyJson);
    } catch (e) {
        console.error(e);
        res.send(e);
    }
});

app.get('/plants/:name', async (req, res) => {
    try {
        let name = req.params.name.trim();
        let plant = await Plant.findOne({
            where: { name: name },
        });
        let results = await plant.getMeasurements({ order: [['createdAt', 'DESC']] });
        let prettyJson = JSON.stringify(results, null, 4);

        res.type('json');
        res.send(prettyJson);
    } catch (e) {
        console.error(e);
        res.send(e);
    }
});

app.post('/plants', async (req, res) => {
    try {
        let name = req.body.name.trim();
        let plant = await Plant.create({ name: name });
        let prettyJson = JSON.stringify(plant, null, 4);

        res.type('json');
        res.send(prettyJson);
    } catch (e) {
        console.error(e);
        res.send(e);
    }
});

app.post('/measurements', async (req, res) => {
    try {
        let name = req.body.name.trim();
        let moisture = req.body.moisture;

        let plant = await Plant.findOne({ where: { name: name } });
        let measurement = await plant.createMeasurement({
            moisture: moisture
        });
        let prettyJson = JSON.stringify(measurement, null, 4);

        res.type('json');
        res.send(prettyJson);
    } catch (e) {
        console.error(e);
        res.send(e);
    }

});

async function startApp() {
    try {
        await connectToDatabase();
        app.listen(port, () => console.log(`Listening on port ${port}!`))
    } catch (e) {
        console.error('Unable to start server: ', e);
    }
}

startApp();