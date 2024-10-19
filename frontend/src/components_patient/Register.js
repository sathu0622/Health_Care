import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Input, message, DatePicker, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment"; // For date formatting
import healthImage from '../assets/2.jpg'; // Import your image

const { Option } = Select;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dob, setDob] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/api/user/register", {
      username: values.username,
      email: values.email,
      number: values.number,
      address: values.address,
      password: values.password,
      bloodGroup: values.bloodGroup,
      DOB: values.dob ? moment(values.dob).format("YYYY-MM-DD") : null, // Format the date
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else {
          message.error("Email already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validatePassword = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <img
          src={healthImage} // Image displayed on the left
          alt="Health"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>
          <Form
            name="register"
            layout="vertical"
            className="register-form"
            onFinish={handleSubmit}
          >
            {/* Username Field */}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your Username!" }]}
            >
              <Input
                size="large"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your Email!" },
                {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Phone Number Field */}
            <Form.Item
              label="Phone Number"
              name="number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^(0)[0-9]{9}$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your phone number"
                onChange={(e) => setNumber(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Address Field */}
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your Address!" }]}
            >
              <Input
                size="large"
                placeholder="Enter your address"
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Blood Group Field */}
            <Form.Item
              label="Blood Group"
              name="bloodGroup"
              rules={[{ required: true, message: "Please select your blood group!" }]}
            >
              <Select
                size="large"
                placeholder="Select your blood group"
                onChange={(value) => setBloodGroup(value)}
                className="p-3 border rounded-md w-full"
              >
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
              </Select>
            </Form.Item>

            {/* Date of Birth Field */}
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Please enter your date of birth!" }]}
            >
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                placeholder="Select your date of birth"
                onChange={(date) => setDob(date)}
                className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please provide a password!" },
                {
                  min: 8,
                  max: 15,
                  message: "Password must be between 8-15 characters!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </Form.Item>

            {/* Register Button */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 text-white bg-green-600 hover:bg-indigo-700 rounded-md"
            >
              Register
            </Button>

            {/* Footer: Link to Login */}
            <div className="mt-6 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
                Log In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
