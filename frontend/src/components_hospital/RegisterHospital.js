// RegisterHospital.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterHospital = () => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    password: '',
    specialization: '',
    capacity: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!hospitalData.name) tempErrors.name = "Name is required";
    if (!hospitalData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(hospitalData.email)) tempErrors.email = "Email is not valid";
    if (!hospitalData.address) tempErrors.address = "Address is required";
    if (!hospitalData.number) tempErrors.number = "Contact number is required";
    if (!/^[0-9]{10}$/.test(hospitalData.number)) tempErrors.number = "Contact number must be 10 digits";
    if (!hospitalData.password || hospitalData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    if (!hospitalData.specialization) tempErrors.specialization = "Specialization is required";
    if (!hospitalData.capacity || isNaN(hospitalData.capacity)) tempErrors.capacity = "Capacity must be a number";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/hospitals', hospitalData);
        alert('Hospital registered successfully!');
        console.log(response.data);
      } catch (error) {
        alert('Error registering hospital');
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Register Hospital</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={hospitalData.name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={hospitalData.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            value={hospitalData.address} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <input 
            type="text" 
            name="number" 
            placeholder="Contact Number" 
            value={hospitalData.number} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={hospitalData.password} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <input 
            type="text" 
            name="specialization" 
            placeholder="Specialization" 
            value={hospitalData.specialization} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
        </div>
        <div>
          <input 
            type="text" 
            name="capacity" 
            placeholder="Capacity" 
            value={hospitalData.capacity} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterHospital;
