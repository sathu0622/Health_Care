import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from "./sidebar"

const AdminPanel = () => {
  const [doctors, setDoctors] = useState(0);
  const [patients, setPatients] = useState(0);
  const [scheduled, setScheduled] = useState(0);
  const [payments, setPayments] = useState(0);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await axios.get('http://localhost:5000/api/doctors/get');
        const patientsRes = await axios.get('http://localhost:5000/api/user/readCustomerDetails');
        const scheduleRes = await axios.get('http://localhost:5000/appointments');
        const paymentsRes = await axios.get('http://localhost:5000/hospitals');
        
        console.log(doctorsRes.data); // Log to verify the data structure
        console.log(patientsRes.data.length);
        console.log(scheduleRes.data);
        console.log(paymentsRes.data);
  
        setDoctors(doctorsRes.data.length); 
        setPatients(patientsRes.data.response.length); 
        setScheduled(scheduleRes.data.length); 
        setPayments(paymentsRes.data.length); 
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="flex">
      {/* Sidebar */}
      
    <SideBar/>
      {/* Dashboard Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          {/* Dashboard Card 1 */}
          <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <i className="fas fa-user-md text-4xl"></i>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">Active Doctors</h3>
              <p className="text-3xl">{doctors}</p>
            </div>
          </div>

          {/* Dashboard Card 2 */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <i className="fas fa-procedures text-4xl"></i>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">Active Patients</h3>
              <p className="text-3xl">{patients}</p>
            </div>
          </div>

          {/* Dashboard Card 3 */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <i className="fas fa-calendar-alt text-4xl"></i>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">Appointment</h3>
              <p className="text-3xl">{scheduled}</p>
            </div>
          </div>

          {/* Dashboard Card 4 */}
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <i className="fas fa-credit-card text-4xl"></i>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">Hospitals</h3>
              <p className="text-3xl">{payments}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

