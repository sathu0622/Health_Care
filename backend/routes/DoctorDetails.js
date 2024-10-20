const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/DoctorDetails');

router.post('/addDoctor', doctorController.addDoctor);
router.post('/login', doctorController.doctorLogin)
router.get('/getDoctors', doctorController.getAllDoctors);
router.get('/get', doctorController.getDoctors);
router.put('/updateDoctor/:id', doctorController.updateDoctor);
router.delete('/deleteDoctor/:id', doctorController.deleteDoctor);

module.exports = router;
