import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    specialization: '',
    availableDays: [],
    email: '',
    password: '',
    confirmPassword: '', // Added confirm password field
    phoneNumber: '',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'availableDays') {
      setFormData((prev) => ({
        ...prev,
        availableDays: prev.availableDays.includes(value)
          ? prev.availableDays.filter((day) => day !== value)
          : [...prev.availableDays, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The password and confirm password fields do not match.',
      });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/doctors/addDoctor', formData);
      
      // Success SweetAlert2 notification
      Swal.fire({
        icon: 'success',
        title: 'Doctor Added Successfully',
        text: 'The doctor has been registered successfully!',
      });

      // Reset form data after submission
      setFormData({
        name: '',
        from: '',
        specialization: '',
        availableDays: [],
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error adding doctor:', error);

      // Error SweetAlert2 notification
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Doctor',
        text: 'An error occurred while adding the doctor. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="From"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Available Days</label>
          {days.map((day) => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="availableDays"
                value={day}
                onChange={handleChange}
                checked={formData.availableDays.includes(day)}
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          pattern="\d{10,15}"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorRegistration;
