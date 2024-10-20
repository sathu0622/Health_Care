const mongoose = require('mongoose');
const hospitalSchema = require('./Hospital')
const Hospital = mongoose.model('Hospital', hospitalSchema.schema);
const doctorSchema = require('./DoctorDetails')
const Doctor = mongoose.model('Doctor', doctorSchema.schema);

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contactPreference: { type: String, enum: ['email', 'phone'], required: true },
    doctor:{
        type: mongoose.Types.ObjectId,
        ref: Doctor
      },
    hospital:{
        type: mongoose.Types.ObjectId,
        ref: Hospital
      },
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    timeZone: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
