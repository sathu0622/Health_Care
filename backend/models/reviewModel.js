const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewid: { type: String, required: true },
  Name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: String, required: true },
  freview: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
