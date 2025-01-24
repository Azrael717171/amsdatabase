const mongoose = require('mongoose');

// Define the schema for the override
const overrideSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  department: { type: String, required: true },
  employee: { type: String, required: true },
  nature: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  createdBy: { type: String, required: true, default: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

// Create the model using the schema
const Override = mongoose.model('Override', overrideSchema);

module.exports = Override;
