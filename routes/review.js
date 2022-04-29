const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");
const { validateReview, isLogedIn } = require("../middleware");

router.post(
  "/products/:productId",
  isLogedIn,
  validateReview,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { rating, comment } = await req.body;
      const review = await Review.create({ rating, comment });
      review.save();
      // console.log(review);
      const reviewId = review._id;
      // console.log(reviewId);
      // console.log(productId);

      const product = await Product.findById(productId);

      product.reviews.push(reviewId);

      await product.save();
      req.flash("success", "Added your review successfully!");
      res.redirect(`/products/${productId}`);
    } catch (e) {
      req.flash("error", "Review hasn't been added");
      res.status(500).render("error", { e });
    }
  }
);

module.exports = router;
