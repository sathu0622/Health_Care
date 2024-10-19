// PatientsView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientsView = () => {
  const [hospitals, setHospitals] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Available Hospitals</h2>
      <ul className="space-y-4">
        {hospitals.map((hospital) => (
          <li key={hospital._id} className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow rounded">
            <div className="flex items-center space-x-4">
              <img 
                src={hospital.imageUrl || 'https://via.placeholder.com/150'} 
                alt={hospital.name} 
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{hospital.name}</h3>
                <p>{hospital.specialization}</p>
                <p>{hospital.address}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p><strong>Contact:</strong> {hospital.number}</p>
              <p><strong>Capacity:</strong> {hospital.capacity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsView;
