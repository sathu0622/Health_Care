// controllers/reviewController.js
/*
const Review = require('../models/reviewModel');

const generateReviewid = () => {
  return Math.random().toString(36).substr(2, 9);
};

const createReview = async (req, res) => {
  try {
    const {
      reviewid = generateReviewid(),
      Name,
      email,
      rating,
      freview,
    } = req.body;

    if (!reviewid || !Name || !email || !rating || !freview) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const review = new Review({ reviewid, Name, email, rating, freview });
    await review.save();
    res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).exec();
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, email, rating, freview } = req.body;

    if (!Name || !email || !rating || !freview) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { Name, email, rating, freview },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
*/

const Review = require("../models/ReviewModel");

// Generate Review ID
const generateReviewid = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const { reviewid = generateReviewid(), Name, email, rating, freview } = req.body;

    if (!Name || !email || !rating || !freview) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const review = new Review({
      reviewid,
      Name,
      email,
      rating,
      freview,
    });

    await review.save();
    res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).exec();
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, email, rating, freview } = req.body;

    if (!Name || !email || !rating || !freview) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { Name, email, rating, freview },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
