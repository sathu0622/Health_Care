// PatientsView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PatientsView = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewClick = (hospitalEmail) => {
    navigate("/view-doctor", { state: { email: hospitalEmail } });
  };
  

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Hospitals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hospitals.map((hospital) => (
          <li key={hospital._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <img 
                src={hospital.image} 
                alt={hospital.name} 
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.specialization}</p>
                  <p className="mt-2 text-gray-500">{hospital.address}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm"><strong>Contact:</strong> {hospital.number}</p>
                    <p className="text-sm"><strong>Capacity:</strong> {hospital.capacity}</p>
                  </div>
                  <button 
                    className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition duration-200"
                    onClick={() => handleViewClick(hospital.email)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsView;
