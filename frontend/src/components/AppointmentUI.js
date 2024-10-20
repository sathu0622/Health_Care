import React, { useRef } from 'react';
import HospitalImage1 from '../assets/HospitalImage1.jpg';
import HospitalImage2 from '../assets/HospitalImage2.jpg';
import HospitalImage3 from '../assets/HospitalImage3.jpeg';
import HospitalImage4 from '../assets/HospitalImage4.jpeg';
import AppointmentForm from '../components/AppointmentForm';
import { useLocation } from 'react-router-dom';
import Header from '../header/UserHeader';

const AppointmentUI = () => {
    const targetRef = useRef(null);
    const location = useLocation();
    const { hospitalId, doctorId } = location.state || {};

    const handleScroll = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Welcome to Our Hospital's New Alfred Place Wing
                        </h1>
                        <p className="text-lg text-gray-600 mt-4">
                            Your health is our priority. Trust us for comprehensive care.
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start space-x-4">
                            <button 
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                                onClick={handleScroll}
                            >
                                Schedule an Appointment
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <div className="relative w-full h-80">
                            <img
                                src={HospitalImage1}
                                alt="Hospital Environment"
                                className="rounded-lg shadow-lg absolute inset-0 w-full h-full object-cover transform rotate-12 clip-diamond"
                            />
                        </div>
                        <div className="relative w-full h-80">
                            <img
                                src={HospitalImage2}
                                alt="Healthcare Professionals"
                                className="rounded-lg shadow-lg absolute inset-0 w-full h-full object-cover transform rotate-12 clip-diamond"
                            />
                        </div>
                        <div className="relative w-full h-80">
                            <img
                                src={HospitalImage3}
                                alt="Patient Care"
                                className="rounded-lg shadow-lg absolute inset-0 w-full h-full object-cover transform rotate-12 clip-diamond"
                            />
                        </div>
                        <div className="relative w-full h-80">
                            <img
                                src={HospitalImage4}
                                alt="Modern Facilities"
                                className="rounded-lg shadow-lg absolute inset-0 w-full h-full object-cover transform rotate-12 clip-diamond"
                            />
                        </div>
                    </div>
                </div>

                <div ref={targetRef} className="mt-20 p-6 bg-gray-100 rounded-lg w-full">
                    <AppointmentForm hospitalId={hospitalId} doctorId={doctorId} />
                </div>
            </div>
        </div>
    );
};

export default AppointmentUI;
