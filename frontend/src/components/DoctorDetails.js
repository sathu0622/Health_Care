// DoctorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import { useLocation } from 'react-router-dom';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const { email } = location.state || {}; // Extract email from the passed state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log(email)
        const response = await axios.get(`http://localhost:5000/api/doctors/getDoctors`, {
          params: { hospital: email } // Send email as a query parameter
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    if (email) {
      fetchDoctors(); // Call fetchDoctors only if email is available
    }
  }, [email]); // Dependency array includes email

  return (
    <div className="max-w-screen-lg mx-auto px-4 m-10">
      <h1 className="text-3xl font-bold mb-6">Doctor List</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorDetails;
