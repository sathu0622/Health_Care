import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctoreCard';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors/getDoctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4 m-10 ">
      <h1 className="text-3xl font-bold mb-6">Doctor List</h1>
      <div className=" md:grid-cols-2 lg:grid-cols-3 gap-10">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
