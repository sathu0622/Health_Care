const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            contactPreference,
            doctor,
            hospital,
            appointmentDate,
            timeSlot,
            timeZone
        } = req.body;

        const newAppointment = new Appointment({
            firstName,
            lastName,
            email,
            phoneNumber,
            contactPreference,
            doctor,
            hospital,
            appointmentDate,
            timeSlot,
            timeZone,
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('hospital').populate('doctor');
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id).populate('hospital').populate('doctor');
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


