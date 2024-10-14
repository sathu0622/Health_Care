import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DoctorForm from "./components/DoctorRegistration";
import DoctorDetails from "./components/DoctorDetails";
import AppointmentUI from './components/AppointmentUI'

function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* <Route path="/" element={<FrontPage/>} /> */}
        <Route path="/add-doctor" element={<DoctorForm />} />
        <Route path="/view-doctor" element={<DoctorDetails />} />
        <Route path="/appointmentUI" element={<AppointmentUI />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
