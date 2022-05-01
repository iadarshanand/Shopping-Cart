const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const productApi = require("./routes/api/productapi");
const ejsMate = require("ejs-mate");
require("dotenv").config();

const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const res = require("express/lib/response");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
mongoose
  .connect(process.env.mongo_link)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
const sessionConfig = {
  secret: process.env.session_secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.send("Server is responsing");
});
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productApi);
app.use(cartRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
