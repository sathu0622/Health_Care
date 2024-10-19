import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import healthImage from '../assets/2.jpg'; // Import your image.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/api/user/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          sessionStorage.setItem("userEmail", email);
          console.log(response.data.status);
          console.log(email);

          if (email === "sathushan622@gmail.com") {
            navigate("/add-product");
          } else {
            navigate("/manage-hospitals");
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
    <div className="flex min-h-screen">
      <div className="flex-1">
        <img
          src={healthImage} // Image displayed on the left
          alt="Health"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md bg-opacity-90 backdrop-blur-sm">
          <Form
            name="normal_login"
            className="flex flex-col gap-4"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Patient Login
            </h3>

            <Form.Item
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
                prefix={<MailOutlined />}
                placeholder="Email"
                className="w-full p-2 border-b border-black outline-none text-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                className="w-full p-2 border-b border-black outline-none text-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-600 text-white rounded-md w-full py-2 mt-4"
            >
              Log in
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-500">
                Don't have an Account? &nbsp;
                <Link to="/register" className="text-green-600 font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
