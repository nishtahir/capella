/* eslint-disable func-names */
import { Schema } from 'mongoose';

const measurementSchema = new Schema({
  value: {
    type: Number,
    required: [true, 'Plant moisture value must be provided.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default measurementSchema;
