const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const appointmentRoutes = require('./routes/appointmentRoutes');
const HospitalRoutes = require('./routes/HospitalRouter');
const appointmentRoutes = require('./route/appointmentRoutes');
const doctorsRouter = require('./route/DoctorDetails');

dotenv.config();
const {v4:uuidv4} =require("uuid");
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
    cors({
      origin: 'http://localhost:3000', 
      credentials: true, 
    })
  );

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(cookieParser());
app.use('/appointments', appointmentRoutes);
app.use('/hospitals', HospitalRoutes);
app.use('/api/doctors', doctorsRouter);
app.use('api/send-pdf',)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

app.use(express.json()); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});