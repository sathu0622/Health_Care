// ManageHospitals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    specialization: '',
    capacity: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/hospitals/${id}`);
      alert('Hospital deleted');
      fetchHospitals();
    } catch (error) {
      console.error(error);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!updatedData.name) tempErrors.name = "Name is required";
    if (!updatedData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(updatedData.email)) tempErrors.email = "Email is not valid";
    if (!updatedData.address) tempErrors.address = "Address is required";
    if (!updatedData.number) tempErrors.number = "Contact number is required";
    if (!/^[0-9]{10}$/.test(updatedData.number)) tempErrors.number = "Contact number must be 10 digits";
    if (!updatedData.specialization) tempErrors.specialization = "Specialization is required";
    if (!updatedData.capacity || isNaN(updatedData.capacity)) tempErrors.capacity = "Capacity must be a number";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async (id) => {
    if (validate()) {
      try {
        await axios.put(`http://localhost:5000/hospitals/${id}`, updatedData);
        alert('Hospital updated');
        fetchHospitals();
        setSelectedHospital(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setUpdatedData(hospital);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Manage Hospitals</h2>
      <ul className="space-y-4">
        {hospitals.map((hospital) => (
          <li key={hospital._id} className="flex justify-between items-center bg-white p-4 shadow rounded">
            <span>{hospital.name} - {hospital.specialization}</span>
            <div className="space-x-4">
              <button onClick={() => handleEdit(hospital)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit
              </button>
              <button onClick={() => handleDelete(hospital._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedHospital && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Edit Hospital</h3>
          <form onSubmit={() => handleUpdate(selectedHospital._id)} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={updatedData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <input
                type="text"
                name="number"
                value={updatedData.number}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>
            <div>
              <input
                type="text"
                name="specialization"
                value={updatedData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
            </div>
            <div>
              <input
                type="text"
                name="capacity"
                value={updatedData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
            </div>
            <div>
              <input
                type="text"
                name="image"
                value={updatedData.image}
                onChange={handleChange}
                placeholder="ImageURL"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageHospitals;
