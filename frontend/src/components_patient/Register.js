import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

 
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();
 
  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/api/user/register", {
      username: values.username,
      email: values.email,
      number: values.number,
      address: values.address,
      password: values.password,
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
<div className="register-page">
<div className="register-container">
<h2 className="register-title">Sign Up</h2>
<Form
          name="register"
          layout="vertical"
          className="register-form"
          onFinish={handleSubmit}
>
<Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your Username!" }]}
>
<Input
              size="large"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
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
              className="register-input-field"
            />
</Form.Item>
 
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
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your Address!" }]}
>
<Input
              size="large"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
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
              className="register-input-field"
            />
</Form.Item>
 
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
              className="register-input-field"
            />
</Form.Item>
 
          <Button
            type="primary"
            htmlType="submit"
            className="register-button"
>
            Register
</Button>
 
          <div className="register-footer">
            Already have an account?{" "}
<Link to="/login" className="login-link">
              Log In
</Link>
</div>
</Form>
</div>
</div>
  );
};
 
export default Register;