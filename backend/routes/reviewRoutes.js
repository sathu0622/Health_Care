const express = require("express");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/review", getAllReviews);
router.get("/review/:id", getReviewById);
router.post("/reviewbills", createReview);
router.put("/review/:id", updateReview);
router.delete("/reviewbills/:id", deleteReview);

module.exports = router;
