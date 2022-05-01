const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const user = { email, username };
    const newUser = await User.register(user, password);
    newUser.role = role;
    newUser.save();

    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome, Registered Successfully");
      return res.redirect("/products");
    });
  } catch (err) {
    req.flash("error", `${err.message}, Please sign Up again`);
    res.redirect("/signup");
  }
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {
    let previousUrl = req.session.priviousUrl;
    if (!previousUrl) previousUrl = "/products";
    delete req.session.previousUrl;
    req.flash("success", `Welcome Back ${req.user.username} Again!!!!`);
    res.redirect(previousUrl);
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  delete req.session.previousUrl;
  req.flash("success", "logout successfully!!!");
  res.redirect("/products");
});

module.exports = router;
