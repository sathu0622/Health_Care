const Doctor = require('../models/DoctorDetails');
const bcrypt = require('bcrypt');

exports.addDoctor = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const doctor = new Doctor({ ...req.body, password: hashedPassword });
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// exports.getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.send(doctors);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

exports.getAllDoctors = async (req, res) => {
  const { hospital } = req.query;
  try {
    const doctors = await Doctor.find({hospital})
    res.json(doctors)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).send('Doctor not found');
    res.send(doctor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send('Doctor not found');
    res.send(doctor);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
