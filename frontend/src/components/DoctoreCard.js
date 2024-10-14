import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

const DoctorCard = ({ doctor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...doctor });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctors/updateDoctor/${doctor._id}`,
        formData
      );
      Swal.fire("Updated!", "Doctor details updated successfully.", "success");
      setIsEditing(false);
    } catch (error) {
      Swal.fire("Error!", "Failed to update doctor details.", "error");
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/doctors/deleteDoctor/${doctor._id}`
          );
          Swal.fire("Deleted!", "Doctor has been deleted.", "success");
          // Refresh doctor list or update UI accordingly
        } catch (error) {
          Swal.fire("Error!", "Failed to delete doctor.", "error");
        }
      }
    });
  };

  // Generate and download a PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Doctor Email & Password", 10, 10);
    doc.text(`Email: ${formData.email}`, 10, 20);
    doc.text(`Password: ${formData.password}`, 10, 30);
    doc.save(`${formData.name}-credentials.pdf`);
  };


  return (
    <div className="border rounded p-4 shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor Name"
            className="mb-2 p-2 border rounded"
          />
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-2 p-2 border rounded"
          />
          <br />
          <input
            type="text"
            name="availableDays"
            value={formData.availableDays}
            onChange={handleChange}
            placeholder="Available Days"
            className="mb-2 p-2 border rounded"
          />
          <br />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="mb-2 p-2 border rounded"
          />
          <br />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded flex-1"
            >
              Save
            </button>
          
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <br />
          <p>
            <strong>Specialization:</strong> {doctor.specialization}
          </p>
          <br />
          <p>
            <strong>Available Days:</strong> {doctor.availableDays} 
          </p>
          <br />
          <div className="flex space-x-4">
            
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-400 text-white p-2 rounded flex-1"
            >
              Edit
            </button>

            <button
              onClick={generatePDF}
              className="bg-blue-400 text-white p-2 rounded flex-1"
            >
              Download PDF
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded flex-1"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorCard;
