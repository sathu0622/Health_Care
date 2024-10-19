const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  specialization: { type: String, required: true },
  availableDays: { type: [String], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hospital:{ type: String, required: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
