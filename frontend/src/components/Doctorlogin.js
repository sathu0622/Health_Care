import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import healthImage from '../assets/2.jpg'; // Import your image.

const Doctorlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/api/doctors/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          sessionStorage.setItem("userEmail", email);
          console.log(response.data.status);
          console.log(email);

          if (email === "sathushan622@gmail.com") {
            navigate("/add-doctor");
          } else {
            navigate("/add-doctor");
          }
        } else {
          message.error("Your password or email is incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Your email is incorrect");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg">
        {/* Left side with Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-purple-100">
          <img
          src={healthImage} // Image displayed on the left
          alt="Health"
          className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right side with Login form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Hospital Login
          </h2>
          
          <Form
            name="normal_login"
            layout="vertical"
            className="flex flex-col gap-4"
            onFinish={handleSubmit}
          >
            {/* Email Field */}
            <Form.Item
              name="email"
              label="Email"
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
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2"
              />
            </Form.Item>

            {/* Login Button */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md"
            >
              Log in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Doctorlogin;
