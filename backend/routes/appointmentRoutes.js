const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);

router.get('/', appointmentController.getAllAppointments);

router.get('/:id', appointmentController.getAppointmentById);

router.get('/:email', appointmentController.getAppointmentByEmail);

router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
