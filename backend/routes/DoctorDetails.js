const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/DoctorDetails');

router.post('/addDoctor', doctorController.addDoctor);
router.get('/getDoctors', doctorController.getAllDoctors);
router.put('/updateDoctor/:id', doctorController.updateDoctor);
router.delete('/deleteDoctor/:id', doctorController.deleteDoctor);

module.exports = router;
