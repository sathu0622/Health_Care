import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QRCodeCanvas } from 'qrcode.react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    contactPreference: 'email',
    appointmentDate: null,
    timeSlot: '',
    timeZone: 'Europe/London',
  });

  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [appointmentId, setAppointmentId] = useState(null); // State for appointment ID
  const qrCodeRef = useRef(); // Ref for QR code canvas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, appointmentDate: date });
    setErrors((prevErrors) => ({ ...prevErrors, appointmentDate: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid phone number (10-15 digits).';
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required.';
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Time slot is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `appointment-${appointmentId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const appointmentData = {
      ...formData,
      doctor: '670c9bdfd65b4aea5d9d1515',
      hospital: '6710f96fabcdae0a33f8c25b',
    };

    axios
      .post('http://localhost:5000/appointments', appointmentData)
      .then((res) => {
        const appointmentId = res.data.appointment._id;
        setAppointmentId(appointmentId);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          contactPreference: 'email',
          appointmentDate: null,
          timeSlot: '',
          timeZone: 'Europe/London',
        });

        // Open the modal to show the QR code
        setOpenModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ];

  const timeZones = [
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Patient Appointment Form
        </Typography>
        
        {/* Layout using Box */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
          />
          {errors.firstName && (
            <FormHelperText sx={{ color: 'red' }}>
              {errors.firstName}
            </FormHelperText>
          )}

          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
          />
          {errors.lastName && (
            <FormHelperText sx={{ color: 'red' }}>
              {errors.lastName}
            </FormHelperText>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText sx={{ color: 'red' }}>
              {errors.email}
            </FormHelperText>
          )}

          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            fullWidth
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <FormHelperText sx={{ color: 'red' }}>
              {errors.phoneNumber}
            </FormHelperText>
          )}

          <FormControl component="fieldset">
            <FormLabel component="legend">Contact Preference</FormLabel>
            <RadioGroup
              row
              name="contactPreference"
              value={formData.contactPreference}
              onChange={handleChange}
            >
              <FormControlLabel value="email" control={<Radio />} label="Via Email" />
              <FormControlLabel value="phone" control={<Radio />} label="Via Phone" />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Appointment Date"
              value={formData.appointmentDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  error={!!errors.appointmentDate}
                />
              )}
            />
            {errors.appointmentDate && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.appointmentDate}
              </FormHelperText>
            )}
          </LocalizationProvider>

          <TextField
            select
            label="Time Slot"
            name="timeSlot"
            fullWidth
            required
            value={formData.timeSlot}
            onChange={handleChange}
            error={!!errors.timeSlot}
          >
            {timeSlots.map((slot) => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </TextField>
          {errors.timeSlot && (
            <FormHelperText sx={{ color: 'red' }}>
              {errors.timeSlot}
            </FormHelperText>
          )}

          <TextField
            select
            label="Time Zone"
            name="timeZone"
            fullWidth
            value={formData.timeZone}
            onChange={handleChange}
          >
            {timeZones.map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Schedule
        </Button>
      </Box>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <Box ref={qrCodeRef}>
            {appointmentId && (
              <QRCodeCanvas value={`${appointmentId}`} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} variant="contained" color="primary">
            Download
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentForm;
