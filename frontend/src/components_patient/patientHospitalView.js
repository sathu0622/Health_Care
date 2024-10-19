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
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleViewClick = (hospitalEmail) => {
    navigate("/view-doctor", { state: { email: hospitalEmail } });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Available Hospitals</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {hospitals.map((hospital) => (
          <li key={hospital._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              {/* Hospital Image */}
              <div className="h-56 overflow-hidden rounded-t-lg">
                <img
                  src={hospital.image || '/placeholder.jpg'}  // Placeholder for missing image
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hospital Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {hospital.name || "Unnamed Hospital"}
                  </h3>
                  <p className="text-gray-500 mb-2">
                    <strong>Address:</strong> {hospital.address || "Address not available"}
                  </p>
                </div>


                {/* View Details Button */}
                <button
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-200"
                  onClick={() => handleViewClick(hospital.email)}
                >
                  View Details
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsView;
