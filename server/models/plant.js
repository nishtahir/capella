import { Schema, model } from 'mongoose';
import measurementSchema from './measurement.js';

const plantSchema = new Schema({
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

export default model('Plant', plantSchema);
