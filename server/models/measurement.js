/* eslint-disable func-names */
const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: [true, 'Plant name must be provided'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = measurementSchema;
