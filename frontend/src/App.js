import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DoctorForm from "./components/DoctorRegistration";
import DoctorDetails from "./components/DoctorDetails";
import AppointmentUI from "./components/AppointmentUI";
import RegisterHospital from "./components_hospital/RegisterHospital";
import ManageHospitals from "./components_hospital/ManageHospitals";
import AppointmentScanner from "./components/AppointmentScanner";
import Register from "./components_patient/Register";
import Login from "./components_patient/login";
import PatientHospital from "./components_patient/patientHospitalView";
import LoginHospital from "./components_hospital/login";
import AppointmentHospital from "./components/AppointmentHospital";
import AppointmentDoctor from "./components/AppointmentDoctor";
import HomePage from "./components/HomePage";
import RoleSelection from "./components/RoleSelection";
import AdminPanel from "./components_hospital/AdminPanel";
import ViewAppointment from "./components/ViewAppointment";
import Review from "./page/Review"
import ReviewForm from "./page/formreview"
import ReviewList from "./page/listreview"
import ReviewView from "./page/reviewview"
import UserReview from "./page/Userreviewlist"
import Payment from "./components/Payment"
import DoctorLogin from  "./components/Doctorlogin"
import Doctor from "./components/Doctor";
import AddArticle from "./components/AddArticle";
import ViewArticles from "./components/ViewArticles"

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
          <Route path="/appointmentScanner" element={<AppointmentScanner />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patientHospital" element={<PatientHospital />} />
          <Route path="/login-hospital" element={<LoginHospital />} />
          <Route path="/appointmentHospital" element={<AppointmentHospital />}  />
          <Route path="/appointmentDoctor" element={<AppointmentDoctor />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/roleSelection" element={<RoleSelection />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/viewAppointment" element={<ViewAppointment />} />
          <Route path="/review" element={<Review />} />
          <Route path="/formreview" element={<ReviewForm />} />
          <Route path="/listreview" element={<ReviewList />} />
          <Route path="/reviewview" element={<ReviewView />} />
          <Route path="/Userreviewlist" element={<UserReview />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} /> 
          <Route path="/doctor" element={<Doctor/>} /> 
          <Route path="/postarticles" element={<AddArticle/>} /> 
          <Route path="/viewArticles" element={<ViewArticles/>} /> 
          
        </Routes>
      </Router>
    </>
  );
}
export default App;
