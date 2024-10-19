const Hospital = require('../models/Hospital');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const express = require('express');
const bcrypt = require('bcrypt');

const KEY = "jwttokenkey"; 

// Create a new hospital
exports.createHospital = async (req, res) => {
    const {name, email, address, number, password, specialization, capacity} = req.body;
    const cus = await Hospital.findOne({ email })
    if (cus) {
      return res.json({ message: "user already existed" })
    }
  
    const hashpassword = await bcrypt.hash(password, 10)
    const newCustomer = new Hospital({
      name,
      email,
      number,
      address,
      password: hashpassword,
      specialization,
      capacity
    });
  
    await newCustomer.save()
    return res.json({ status: true, message: "record registed" })
};


exports.hospitalLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await Hospital.findOne({ email })
    if (!user) {
      return res.json({ message: "User is not registered" })
    }
  
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.json({ message: "Password is incorrect" })
    }
  
    const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login successfully" })
  }
  

// Get all hospitals
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hospital by ID
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a hospital by ID
exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a hospital by ID
exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
