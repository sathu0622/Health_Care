import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, _id } = location.state || {};

  console.log(email, _id);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log(email);
        const response = await axios.get(`http://localhost:5000/api/doctors/getDoctors`, {
          params: { hospital: email },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    if (email) {
      fetchDoctors();
    }
  }, [email]);

  const handleAppointmentClick = (doctorId) => {
    // Navigate to the AppointmentUI and pass the user ID and doctor ID
    navigate('/appointmentUI', { state: { hospitalId: _id, doctorId :doctorId } });
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 m-10">
      <h1 className="text-3xl font-bold mb-6">Doctor List</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-700">{doctor.specialization}</p>
            <button
              onClick={() => handleAppointmentClick(doctor._id)} // Call handleAppointmentClick with the doctor's ID
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Make Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDetails;
