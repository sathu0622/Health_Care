const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');

router.post('/', appointmentController.createAppointment);

router.get('/', appointmentController.getAllAppointments);

module.exports = router;
