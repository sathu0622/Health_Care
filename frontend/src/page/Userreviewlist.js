import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import UserHeader from '../component/UserHeader';
//import Footer from '../component/Footer';
import { Typography, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
//import AddButton from "../component/AddButton";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewReview, setViewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/review");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const { reviewid } = review;
    const query = searchQuery.toLowerCase();
    return (
      (typeof reviewid === "string" && reviewid.toLowerCase().includes(query))
    );
  });

  return (
    <Box flex="1">
      <nav className="sticky top-0 z-10 bg-white shadow">
        <UserHeader />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold">Feedbacks from patients</h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                <Link
                  to="/formreview"
                  className="inline-flex items-center px-4 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Add Yours
                </Link>
                <Link
                  to="/review"
                  className="inline-flex items-center px-5 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  About us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      

      <div className="bg-blue-200 p-8 rounded-lg shadow-md">
        <div className="flex justify-center items-center mb-4 ">
          <Typography variant="h4"></Typography>
        </div>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Review Details</DialogTitle>
          <DialogContent>
          <Typography variant="body1">
              Product: {viewReview && viewReview.reviewid}
            </Typography>
            <Typography variant="body1">
              Name: {viewReview && viewReview.Name}
            </Typography>
            <Typography variant="body1">
              Email: {viewReview && viewReview.email}
            </Typography>
            <Typography variant="body1">
              Rating: {viewReview && viewReview.rating}
            </Typography>
            <Typography variant="body1">
              Feedback: {viewReview && viewReview.freview}
            </Typography>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredReviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-gray-800 font-bold text-lg">Consulted Doctor - <br/>Dr.{review.reviewid}</h3>
              <br/>
              <p className="text-gray-800">{review.freview}</p>
              <p className="text-sm mb-2">-{review.Name}</p>
              <p className="text-yellow-500 mb-2 justify-center">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)} {/* Simple star rating */}
              </p>
              
            </div>
          ))}
        </div>
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
    </Box>
  );
}

export default Reviewlist;






















/*
 <button
                onClick={() => {
                  setViewReview(review);
                  setOpenDialog(true);
                }}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
              */