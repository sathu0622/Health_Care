import React, { useState, useRef } from "react";
import axios from "axios";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AppointmentForm = ({ doctorId, hospitalId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      contactPreference: "email",
      appointmentDate: null,
      timeSlot: "",
      timeZone: "Europe/London",
    },
  });

  const navigate = useNavigate(); // Initialize navigate
  const [openModal, setOpenModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const qrCodeRef = useRef();

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `appointment-${appointmentId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    navigate("/appointmentHospital");
  };

  const onSubmit = (data) => {
    const appointmentData = {
      ...data,
      doctor: doctorId,
      hospital: hospitalId,
    };

    axios
      .post("http://localhost:5000/appointments", appointmentData)
      .then((res) => {
        const appointmentId = res.data.appointment._id;
        setAppointmentId(appointmentId);
        reset();
        setOpenModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  const timeZones = ["Asia/SriLanka"];

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Patient Appointment Form
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="First Name"
            fullWidth
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters and spaces",
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            label="Last Name"
            fullWidth
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone Number"
            type="tel"
            fullWidth
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^(0\d{9}|7\d{8}|\+94\d{9})$/,
                message:
                  "Phone number must be in the format 0775432888, 775432888, +94775432888, or 0112583697",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <FormControl component="fieldset" error={!!errors.contactPreference}>
            <FormLabel component="legend">Contact Preference</FormLabel>
            <Controller
              name="contactPreference"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Via Email"
                  />
                  <FormControlLabel
                    value="phone"
                    control={<Radio />}
                    label="Via Phone"
                  />
                </RadioGroup>
              )}
            />
            {errors.contactPreference && (
              <FormHelperText>
                {errors.contactPreference.message}
              </FormHelperText>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="appointmentDate"
              control={control}
              rules={{ required: "Appointment date is required" }}
              render={({ field }) => (
                <DatePicker
                  label="Appointment Date"
                  {...field}
                  minDate={new Date()} // Prevent selecting past dates
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.appointmentDate}
                      helperText={errors.appointmentDate?.message}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            select
            label="Time Slot"
            fullWidth
            {...register("timeSlot", { required: "Time slot is required" })}
            error={!!errors.timeSlot}
            helperText={errors.timeSlot?.message}
          >
            {timeSlots.map((slot) => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Time Zone"
            fullWidth
            {...register("timeZone", { required: "Time zone is required" })}
            error={!!errors.timeZone}
            helperText={errors.timeZone?.message}
          >
            {timeZones.map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Schedule
        </Button>
      </Box>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <Box ref={qrCodeRef}>
            {appointmentId && <QRCodeCanvas value={`${appointmentId}`} />}
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
