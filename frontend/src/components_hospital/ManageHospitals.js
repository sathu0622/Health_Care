// ManageHospitals.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();
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
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility

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
        setShowPopup(false); // Close the popup after updating
        setSelectedHospital(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setUpdatedData(hospital);
    setShowPopup(true); // Show the popup on edit
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleViewClick = (hospitalEmail) => {
    navigate("/view-doctor", { state: { email: hospitalEmail } });
  };

  // Navigate to the registration page
  const handleAddHospital = () => {
    navigate("/register");
  };

  return (
    <div className="flex">
      <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
          HEALTH ADMIN
        </div>
        <nav className="flex-grow py-6">
          <ul className="space-y-4">
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/dashboard">
                <i className="fas fa-tachometer-alt mr-2"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/doctor">
                <i className="fas fa-user-md mr-2"></i>
                <span>Doctor</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/manage-hospitals">
                <i className="fas fa-procedures mr-2"></i>
                <span>Hospital</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/schedule">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span>Schedule</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/appointment">
                <i className="fas fa-notes-medical mr-2"></i>
                <span>Appointment</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/payment">
                <i className="fas fa-credit-card mr-2"></i>
                <span>Payment</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="max-w-2xl mx-auto p-4 flex-1"> {/* Adjusted container size */}
        <h2 className="text-3xl font-semibold text-center mb-6">Manage Hospitals</h2>

        {/* Add Hospital Button */}
        <button
          onClick={handleAddHospital}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          Add Hospital
        </button>

        <ul className="space-y-4">
          {hospitals.map((hospital) => (
            <li key={hospital._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
              <div className="flex flex-col h-full">
                {/* Hospital Image */}
                <div className="h-36 overflow-hidden rounded-t-lg">
                  <img
                    src={hospital.image || '/placeholder.jpg'}  // Placeholder for missing image
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hospital Details */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {hospital.name || "Unnamed Hospital"}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      <strong>Address:</strong> {hospital.address || "Address not available"}
                    </p>
                  </div>

                  {/* Button Container for Edit, Delete, and View */}
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-200"
                      onClick={() => handleEdit(hospital)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition duration-200"
                      onClick={() => handleDelete(hospital._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition duration-200"
                      onClick={() => handleViewClick(hospital.email)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              {showPopup && selectedHospital && selectedHospital._id === hospital._id && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Edit Hospital Details</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdate(hospital._id); }} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                      {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="image"
                        value={updatedData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                      Update Hospital
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageHospitals;
