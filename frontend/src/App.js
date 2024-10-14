import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DoctorForm from "./components/DoctorRegistration";
import DoctorDetails from "./components/DoctorDetails";
import AppointmentUI from './components/AppointmentUI'
import RegisterHospital from './components_hospital/RegisterHospital';
import ManageHospitals from './components_hospital/ManageHospitals';


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
      </Routes>
    </Router>
    </>
  );
}

export default App;
