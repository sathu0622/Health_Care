import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';
import healthImage from '../assets/2.jpg'; // Import your image

const RegisterHospital = () => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    password: '',
    specialization: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/hospitals', values);
      if (response.data.success) {
        message.success('Hospital registered successfully!');
        navigate('/hospitals'); // Navigate after successful registration
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error('Error registering hospital');
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full">
        <img
          src={healthImage} // Left side image
          alt="Health"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register Hospital</h2>
          <Form
            name="register_hospital"
            layout="vertical"
            className="register-form"
            onFinish={handleSubmit}
          >
            {/* Hospital Name Field */}
            <Form.Item
              label="Hospital Name"
              name="name"
              rules={[{ required: true, message: "Please enter the hospital name!" }]}
            >
              <Input
                size="large"
                placeholder="Enter hospital name"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label="Hospital Email"
              name="email"
              rules={[
                { required: true, message: "Please enter the hospital email!" },
                {
                  type: 'email',
                  message: "Please enter a valid email address!"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter hospital email"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Address Field */}
            <Form.Item
              label="Hospital Address"
              name="address"
              rules={[{ required: true, message: "Please enter the hospital address!" }]}
            >
              <Input
                size="large"
                placeholder="Enter hospital address"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Contact Number Field */}
            <Form.Item
              label="Contact Number"
              name="number"
              rules={[
                { required: true, message: "Please enter the contact number!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Contact number must be 10 digits!"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter contact number"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Specialization Field */}
            <Form.Item
              label="Hospital Specialization"
              name="specialization"
              rules={[{ required: true, message: "Please enter the hospital specialization!" }]}
            >
              <Input
                size="large"
                placeholder="Enter hospital specialization"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Image URL Field */}
            <Form.Item
              label="Hospital Image URL"
              name="image"
              rules={[{ required: true, message: "Please provide an image URL!" }]}
            >
              <Input
                size="large"
                placeholder="Enter image URL"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please provide a password!" },
                { min: 6, message: "Password must be at least 6 characters long!" }
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter password"
                onChange={handleChange}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Register Button */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Register Hospital
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHospital;
