import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" 
         style={{ backgroundImage: `url('path-to-your-image.jpg')` }}>
      <div className="bg-gray-900 bg-opacity-50 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Select your Role</h1>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Patient */}
          <button
            onClick={() => navigate('/login')}
            className="flex flex-col items-center p-6 bg-lime-400 rounded-lg shadow-md hover:bg-lime-500 transition-all"
          >
            <div className="text-4xl text-white mb-4">
              <i className="fas fa-user"></i> {/* Icon for Patient */}
            </div>
            <h2 className="text-xl font-semibold mb-2">Patient</h2>
            <p className="text-center text-gray-800">
              Login to view, edit or cancel your appointment(s)
            </p>
          </button>
          
          {/* Clinic */}
          <button
            onClick={() => navigate('/login-hospital')}
            className="flex flex-col items-center p-6 bg-lime-400 rounded-lg shadow-md hover:bg-lime-500 transition-all"
          >
            <div className="text-4xl text-white mb-4">
              <i className="fas fa-hospital"></i> {/* Icon for Clinic */}
            </div>
            <h2 className="text-xl font-semibold mb-2">Clinic</h2>
            <p className="text-center text-gray-800">
              Login to manage your clinics
            </p>
          </button>

          {/* GP */}
          <button
            onClick={() => navigate('/doctorlogin')}
            className="flex flex-col items-center p-6 bg-lime-400 rounded-lg shadow-md hover:bg-lime-500 transition-all"
          >
            <div className="text-4xl text-white mb-4">
              <i className="fas fa-user-md"></i> {/* Icon for GP */}
            </div>
            <h2 className="text-xl font-semibold mb-2">GP</h2>
            <p className="text-center text-gray-800">
              Login to view or create patient referrals/appointments
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
