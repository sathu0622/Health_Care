import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DoctorForm from "./components/DoctorRegistration";
import DoctorDetails from "./components/DoctorDetails";

function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* <Route path="/" element={<FrontPage/>} /> */}
        <Route path="/add-doctor" element={<DoctorForm />} />
        <Route path="/view-doctor" element={<DoctorDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
