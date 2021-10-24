const mongoose = require('mongoose');
const measurementSchema = require('./measurement');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name must be provided.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  moisture: [measurementSchema],
});

module.exports = mongoose.model('Plant', plantSchema);
