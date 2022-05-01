const express = require("express");
const User = require("../models/user");
const { isLogedIn } = require("../middleware");
const router = express.Router();

router.post("/user/:id/add", isLogedIn, async (req, res) => {
  const productId = req.params.id;
  await req.user.cart.push(productId);
  req.user.save();
  req.flash("success", "Added to cart successfully");
  res.redirect(`/user/${productId}/add`);
});

router.get("/user/:id/add", isLogedIn, async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).populate("cart");
  console.log(user.cart);
  let totalAmount = 0;
  for (let cart of user.cart) totalAmount += cart.price;
  console.log(totalAmount);
  res.render("cart/cart", { user, totalAmount });
});

module.exports = router;
