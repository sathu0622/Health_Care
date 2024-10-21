import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register'; // Import your Register component

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

test('renders Register form with all inputs', () => {
  render(<Register />);

  // Check that all form inputs are rendered
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/blood group/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
});

test('shows error when required fields are missing', async () => {
  render(<Register />);

  // Submit the form without filling it out
  fireEvent.click(screen.getByText(/register/i));

  // Expect validation error messages
  expect(await screen.findAllByText(/please enter/i)).toHaveLength(7); // Assuming 7 fields have required validation
});

test('handles password mismatch validation', async () => {
  render(<Register />);

  // Fill password and confirm password fields
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'wrongpassword' } });

  // Submit the form
  fireEvent.click(screen.getByText(/register/i));

  // Expect validation error
  expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
});
