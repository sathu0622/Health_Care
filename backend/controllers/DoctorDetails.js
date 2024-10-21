const Doctor = require("../models/DoctorDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const KEY = "jwttokenkey";

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

exports.doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Doctor.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, KEY, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  const { hospital } = req.query;
  try {
    const doctors = await Doctor.find({ hospital });
    res.json(doctors);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor) return res.status(404).send("Doctor not found");
    res.send(doctor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    res.send(doctor);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
