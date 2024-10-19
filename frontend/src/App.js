import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DoctorForm from "./components/DoctorRegistration";
import DoctorDetails from "./components/DoctorDetails";
import AppointmentUI from './components/AppointmentUI'
import RegisterHospital from './components_hospital/RegisterHospital';
import ManageHospitals from './components_hospital/ManageHospitals';
import Register from './components_patient/Register';
import Login from './components_patient/login';
import PatientHospital from './components_patient/patientHospitalView';
import LoginHospital from './components_hospital/login';

function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* <Route path="/" element={<FrontPage/>} /> */}
        <Route path="/add-doctor" element={<DoctorForm />} />
        <Route path="/view-doctor" element={<DoctorDetails />} />
        <Route path="/appointmentUI" element={<AppointmentUI />} />
        <Route path="/register-hospitals" element={<RegisterHospital />} />
        <Route path="/manage-hospitals" element={<ManageHospitals />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital" element={<PatientHospital />} />
        <Route path="/login-hospital" element={<LoginHospital />} />

      </Routes>
    </Router>
    </>
  );
}
export default App;
