// PatientsView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PatientsView = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hospitals');
      setHospitals(response.data);
    } catch (error) {
      setError('Failed to fetch hospitals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (hospitalEmail, hospitalId) => {
    navigate("/appointmentDoctor", { state: { email: hospitalEmail, _id: hospitalId } });
  };

  return (
    <main className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Hospitals</h2>
      {loading && <p className="text-center text-gray-600">Loading hospitals...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hospitals.map((hospital) => (
            <li key={hospital._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="md:flex">
                <img 
                  src={hospital.image} 
                  alt={`Image of ${hospital.name}`} 
                  className="w-full md:w-48 h-48 object-cover"
                />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{hospital.name}</h3>
                    <p className="mt-2 text-gray-500">{hospital.address}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => handleViewClick(hospital.email, hospital._id)}
                      aria-label={`View doctors at ${hospital.name}`}
                    >
                      View Doctors
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PatientsView;
