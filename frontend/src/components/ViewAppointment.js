import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Container, Button, Alert } from '@mui/material';
import Header from '../header/UserHeader';
import { useNavigate } from 'react-router-dom';

const ViewAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Retrieve the email from session storage
        const email = sessionStorage.getItem('userEmail');
        
        if (!email) {
            setError('No email found. Please log in.');
            setLoading(false);
            return;
        }

        axios.get('http://localhost:5000/appointments')
            .then((response) => {
                // Filter appointments based on the user's email
                const filteredAppointments = response.data.filter((appt) => appt.email === email);
                
                if (filteredAppointments.length > 0) {
                    setAppointments(filteredAppointments);
                } else {
                    setError('No appointments found for this user.');
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                setError('Error fetching appointment details. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleDelete = (appointmentId) => {
        // Show confirmation dialog
        const confirmed = window.confirm('Are you sure you want to delete this appointment?');

        if (confirmed) {
            setDeleting(true);

            axios.delete(`http://localhost:5000/appointments/${appointmentId}`)
                .then(() => {
                    setAppointments((prevAppointments) => prevAppointments.filter(appt => appt._id !== appointmentId));
                    setError('Appointment has been deleted.');
                })
                .catch((error) => {
                    console.error('Error deleting appointment:', error);
                    setError('Error deleting appointment. Please try again later.');
                })
                .finally(() => {
                    setDeleting(false);
                });
        }
    };

    const handleReviewClick = (appointmentId) => {
        // Navigate to the review page with the appointment ID
        navigate(`/review/${appointmentId}`);
    };

    if (loading) {
        return (
            <Container style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <div>
            <Header />
            <Container style={{ marginTop: '2rem' }}>
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
                <Typography variant="h4" gutterBottom>
                    Appointment Details
                </Typography>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Card key={appointment._id} style={{ marginBottom: '1rem' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Hospital: {appointment.hospital?.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Doctor: {appointment.doctor?.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" style={{ marginTop: '0.5rem' }}>
                                    <strong>Date:</strong> {new Date(appointment?.appointmentDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Time:</strong> {appointment?.timeSlot}
                                </Typography>
                                <div style={{ marginTop: '1rem' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: '1rem' }} // Add space between buttons
                                        onClick={() => handleReviewClick(appointment._id)} // Call handleReviewClick with the appointment ID
                                    >
                                        Review Appointment
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error" 
                                        onClick={() => handleDelete(appointment._id)}
                                        disabled={deleting}
                                    >
                                        {deleting ? 'Deleting...' : 'Delete Appointment'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Alert severity="info">No appointments found.</Alert>
                )}
            </Container>
        </div>
    );
};

export default ViewAppointment;
