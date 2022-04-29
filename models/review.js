const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
