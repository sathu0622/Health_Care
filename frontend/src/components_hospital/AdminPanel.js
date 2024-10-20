import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [doctors, setDoctors] = useState(0);
  const [patients, setPatients] = useState(0);
  const [scheduled, setScheduled] = useState(0);
  const [payments, setPayments] = useState(0);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await axios.get('http://localhost:5000/api/doctors/getDoctors');
        const patientsRes = await axios.get('http://localhost:5000/api/user/readCustomerDetails');
        const scheduleRes = await axios.get('http://localhost:5000/appointments');
        const paymentsRes = await axios.get('http://localhost:5000/hospitals');
        
        console.log(doctorsRes.data); // Log to verify the data structure
        console.log(patientsRes.data);
        console.log(scheduleRes.data);
        console.log(paymentsRes.data);
  
        setDoctors(doctorsRes.data.length); 
        setPatients(patientsRes.data.length); 
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

