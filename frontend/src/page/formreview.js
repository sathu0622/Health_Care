
import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from "../component/UserHeader";
//import Footer from "../component/Footer";

export default function Order() {
  const [formData, setFormData] = useState({
    reviewid: "",
    Name: "",
    email: "",
    rating: "",
    freview: "",
  });

  const starRatings = [
    { value: "1", label: "🌟" },
    { value: "2", label: "🌟🌟" },
    { value: "3", label: "🌟🌟🌟" },
    { value: "4", label: "🌟🌟🌟🌟" },
    { value: "5", label: "🌟🌟🌟🌟🌟" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "reviewid" && /^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "reviewid") {
      setFormData({ ...formData, [name]: value });
    } else if (value === "") {
      setFormData({ ...formData, [name]: "" });
    }
  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.Name.match(/\d+/g)) {
        alert("Name should not contain numbers");
        return;
      }
      if (!formData.email.includes("@gmail.com")) {
        alert("Gmail not correctly given");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/reviewbills",
        formData
      );
      console.log(res.data.message);
      alert("Form submitted successfully!");
      setFormData({
        reviewid: "",
        Name: "",
        email: "",
        rating: "",
        freview: "",
      });
      window.location.href = "/Userreviewlist";
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      
    }
  };

  return (
    
    <div className="bg-white-400">
      <UserHeader />
      <nav className="sticky top-0 z-10 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold">Feedbacks & Inquiries</h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                <Link
                  to="/Userreviewlist"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  User Feedbacks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div
          className="max-w-lg mx-auto p-4 bg-card rounded-lg shadow-lg bg-blue-200 mt-10 mb-10"
          id="order"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="reviewid"
                className="block text-sm font-medium text-zinc-700"
              >
                Doctor You Met
              </label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="text"
                  name="reviewid"
                  id="reviewid"
                  value={formData.reviewid}
                  onChange={handleChange2}
                  placeholder="Name of the Doctor"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-zinc-700"
              >
                Name
              </label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder=" Name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700"
              >
                Email
              </label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange3}
                  placeholder=" XXXX@gmail.com"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-zinc-700"
              >
                Rating
              </label>
              <div className="block text-sm font-medium text-zinc-700">
                <select
                  name="rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                >
                  
                  {starRatings.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="freview"
                className="block text-sm font-medium text-zinc-700 "
              >
                Feedback
              </label>
              <div className="block text-sm font-medium text-zinc-700 ">
                <input
                  type="text"
                  name="freview"
                  id="freview"
                  value={formData.freview}
                  onChange={handleChange}
                  placeholder=" give your experience"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md w-full h-20 p-2"
                ></input>
              </div>
            </div>
            <br />

            <Link to="/Userreviewlist" onClick={handleSubmit}>
              <button
                type="submit"
                className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-700 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-sky-500"
              >
                Submit
              </button>
            </Link>
          </form>
        </div>
        <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Healthcare</p>
            <p>Fossels Lane, Colombo, Sri Lanka</p>
            <p>+94 123 456 789</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/" className="block mt-2 hover:underline">
              Home
            </Link>
            <Link to="/services" className="block mt-2 hover:underline">
              Services
            </Link>
            <Link href="/about" className="block mt-2 hover:underline">
              About
            </Link>
            <Link href="/contact" className="block mt-2 hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          &copy; 2024 Sri Lanka Healthcare | Privacy Policy | Cookie Policy
        </div>
      </footer>
      </main>
    </div>
  );
}
