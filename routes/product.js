const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Joi = require("Joi");
const {
  validateProduct,
  isLogedIn,
  isSeller,
  isAuthor,
} = require("../middleware");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (error) {
    res.status(500).render("error", { e: error.message });
  }
});

router.get("/products/new", isLogedIn, (req, res) => {
  res.render("products/new");
});

router.post("/products", validateProduct, isSeller, async (req, res) => {
  try {
    const { name, img, price, desc, author = req.user._id } = await req.body;
    await Product.create({ name, img, price, desc, author });
    req.flash("success", "Product added successfully");
    res.redirect("/products");
  } catch (error) {
    req.flash("error", "Product hasn't been added");
    res.status(500).render("error", { e: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const product = await Product.findById(id).populate("reviews");
    // console.log(product);

    let totRating = 0;
    for (let review of product.reviews) {
      totRating += review.rating;
    }
    let average = totRating / product.reviews.length;
    if (product.reviews.length) product.avgRating = Math.round(average);

    await product.save();
    // console.log(req.flash("success")); // don't check by console,once it executed cookie from session ended

    res.render("products/show", { product });
  } catch (error) {
    res.status(500).render("error", { e: error.message });
  }
});

router.get("/products/:id/edit", isLogedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render("products/edit", { product });
  } catch (error) {
    res.status(500).render("error", { e: error.message });
  }
});
router.patch("/products/:id", isAuthor, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    res.redirect(`/products/${id}`);
  } catch (error) {
    res.status(500).render("error", { e: error.message });
  }
});

router.delete("/products/:id", isLogedIn, isAuthor, async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.redirect("/products");
  } catch (error) {
    res.status(500).render("error", { e: error.message });
  }
});

module.exports = router;
