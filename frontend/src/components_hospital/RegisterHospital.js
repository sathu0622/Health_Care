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
    capacity: '',
    image: ''
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
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Register Hospital</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Hospital Name"
            value={hospitalData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="email"
            name="email"
            placeholder="Hospital Email"
            value={hospitalData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            name="address"
            placeholder="Hospital Address"
            value={hospitalData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            name="number"
            placeholder="Contact Number"
            value={hospitalData.number}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            name="specialization"
            placeholder="Hospital Register No."
            value={hospitalData.specialization}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            name="capacity"
            placeholder="Capacity"
            value={hospitalData.capacity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            name="image"
            placeholder="ImageURL"
            value={hospitalData.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
        <div className="space-y-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={hospitalData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded hover:from-green-500 hover:to-green-700 transition ease-in-out duration-300"
        >
          Register Hospital
        </button>
      </form>
    </div>
  );
};

export default RegisterHospital;
