import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import jsPDF from 'jspdf';
import Header from '../header/UserHeader';

const AppointmentScanner = () => {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            false
        );

        scanner.render(handleScanSuccess, handleScanError);

        return () => {
            scanner.clear().catch(console.error);
        };
    }, []);

    const handleScanSuccess = (decodedText) => {
        fetchAppointmentDetails(decodedText);
    };

    const handleScanError = (error) => {
        console.error('QR Code Scan Error:', error);
    };

    const fetchAppointmentDetails = async (id) => {
        console.log(id);
        try {
            const response = await axios.get(`http://localhost:5000/appointments/${id}`);
            setAppointmentDetails(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching appointment details:', error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Unable to fetch appointment details.');
            }
        }
    };

    const downloadPDF = () => {
        if (!appointmentDetails) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setTextColor(40); // Set a color for the text
        doc.text("Appointment Details", 14, 22);
        
        // Draw a line under the title
        doc.setLineWidth(0.5);
        doc.line(14, 25, 196, 25); // Horizontal line
    
        // Define details with labels for better structure
        const details = [
            { label: "First Name:", value: appointmentDetails.firstName },
            { label: "Last Name:", value: appointmentDetails.lastName },
            { label: "Email:", value: appointmentDetails.email },
            { label: "Phone Number:", value: appointmentDetails.phoneNumber },
            { label: "Contact Preference:", value: appointmentDetails.contactPreference },
            { label: "Doctor Name:", value: appointmentDetails.doctor?.name },
            { label: "Doctor Specialization:", value: appointmentDetails.doctor?.specialization },
            { label: "Doctor Email:", value: appointmentDetails.doctor?.email },
            { label: "Hospital Name:", value: appointmentDetails.hospital?.name },
            { label: "Hospital Email:", value: appointmentDetails.hospital?.email },
            { label: "Date:", value: new Date(appointmentDetails.appointmentDate).toLocaleString() },
        ];

        // Set starting y position
        let yPosition = 30;

        // Add details to the PDF
        details.forEach((item) => {
            doc.setFontSize(12);
            doc.text(item.label, 14, yPosition);
            doc.setFontSize(12);
            doc.setTextColor(60); // Set color for the value
            doc.text(item.value || 'N/A', 80, yPosition); // Value aligned to the right
            yPosition += 10; // Increase y position for the next item
        });

        // Optional: Add footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Generated on: " + new Date().toLocaleString(), 14, yPosition + 10);

        // Save the PDF
        doc.save("appointment_details.pdf");
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">QR Code Scanner</h1>
                <div className="flex flex-row justify-center w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center justify-center w-1/2 p-4">
                        <div id="qr-reader" className="w-full h-80 border border-gray-300 rounded-lg mb-6 bg-white shadow-lg"></div>
                    </div>
                    <div className="flex flex-col justify-center w-1/2 p-4">
                        {appointmentDetails ? (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointment Details</h2>
                                <p className="text-gray-600"><strong>First Name:</strong> {appointmentDetails.firstName}</p>
                                <p className="text-gray-600"><strong>Last Name:</strong> {appointmentDetails.lastName}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {appointmentDetails.email}</p>
                                <p className="text-gray-600"><strong>Phone Number:</strong> {appointmentDetails.phoneNumber}</p>
                                <p className="text-gray-600"><strong>Contact Preference:</strong> {appointmentDetails.contactPreference}</p>
                                <p className="text-gray-600"><strong>Doctor Name:</strong> {appointmentDetails.doctor?.name}</p>
                                <p className="text-gray-600"><strong>Doctor Specialization:</strong> {appointmentDetails.doctor?.specialization}</p>
                                <p className="text-gray-600"><strong>Doctor Email:</strong> {appointmentDetails.doctor?.email}</p>
                                <p className="text-gray-600"><strong>Hospital Name:</strong> {appointmentDetails.hospital?.name}</p>
                                <p className="text-gray-600"><strong>Hospital Email:</strong> {appointmentDetails.hospital?.email}</p>
                                <p className="text-gray-600"><strong>Date:</strong> {new Date(appointmentDetails.appointmentDate).toLocaleString()}</p>
                                <button 
                                    onClick={downloadPDF} 
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Download PDF
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-medium text-gray-800 mb-2">No Appointment Details Found</h2>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentScanner;
